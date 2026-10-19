import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Every currently published page; draft content must not be published just to exercise a route.
const routes = [
  '/',
  '/o-nas/',
  '/laser-femtosekundowy/',
  '/laboratorium/',
  '/projekty/',
  '/projekty/laserowe-sterowanie-wyladowaniem/',
  '/projekty/wiazki-airyego-w-krysztale-sbn/',
  '/aktualnosci/',
  '/zespol/',
  '/zespol/andrzej-ziolkowski/',
  '/dolacz/',
  '/kontakt/',
];

function captureErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    overflowing: Array.from(document.querySelectorAll('main *')).filter(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.right > window.innerWidth + 1 || bounds.left < -1;
    }).slice(0, 8).map(element => `${element.tagName.toLowerCase()}.${element.className}`),
  }));
  expect.soft(Math.max(dimensions.document, dimensions.body), `${page.url()}: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport + 1);
}

async function expectImagesLoaded(page: Page) {
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('alt');
    await expect.poll(() => image.evaluate(node => node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0), {
      message: `Image failed to load: ${await image.getAttribute('src')}`,
    }).toBe(true);
  }
}

async function expectInternalLinksResolve(page: Page) {
  const internalLinks = await page.locator('a[href]').evaluateAll(anchors => {
    const urls = anchors.map(anchor => new URL(anchor.getAttribute('href')!, window.location.href))
      .filter(url => url.origin === window.location.origin);
    return [...new Set(urls.map(url => `${url.pathname}${url.search}${url.hash}`))];
  });
  expect(internalLinks.length).toBeGreaterThan(0);
  for (const href of internalLinks) {
    const current = new URL(page.url());
    const destination = new URL(href, current);
    if (destination.pathname === current.pathname && destination.search === current.search && destination.hash) {
      const hasTarget = await page.evaluate(hash => {
        const id = decodeURIComponent(hash.slice(1));
        return Boolean(document.getElementById(id) || document.getElementsByName(id).length);
      }, destination.hash);
      expect.soft(hasTarget, `Missing fragment target: ${href}`).toBe(true);
      continue;
    }
    const response = await page.request.get(href);
    expect.soft(response.status(), `Broken internal link: ${href}`).toBe(200);
    const hash = new URL(href, page.url()).hash;
    if (hash && response.ok()) {
      const html = await response.text();
      const hasTarget = await page.evaluate(({ html, hash }) => {
        const document = new DOMParser().parseFromString(html, 'text/html');
        const id = decodeURIComponent(hash.slice(1));
        return Boolean(document.getElementById(id) || document.getElementsByName(id).length);
      }, { html, hash });
      expect.soft(hasTarget, `Missing fragment target: ${href}`).toBe(true);
    }
  }
}

for (const route of routes) {
  test(`${route} — response, content, links and accessibility`, async ({ page }, testInfo) => {
    const errors = captureErrors(page);
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('main')).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    await expectImagesLoaded(page);
    await expectNoHorizontalOverflow(page);
    await expectInternalLinksResolve(page);
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect.soft(accessibility.violations, JSON.stringify(accessibility.violations, null, 2)).toEqual([]);
    expect.soft(errors, 'Browser console and JavaScript errors').toEqual([]);
    if (route === '/') {
      await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true, animations: 'disabled' });
    }
  });
}

test('supervisor profile is linked from the team and exposes verified academic information', async ({ page }) => {
  await page.goto('/zespol/');
  await page.getByRole('link', { name: 'Poznaj opiekuna' }).click();
  await expect(page).toHaveURL(/\/zespol\/andrzej-ziolkowski\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Andrzej Ziółkowski.');
  await expect(page.getByRole('heading', { name: 'Doktorat z wyróżnieniem' })).toBeVisible();
  await expect(page.locator('time[datetime="2023-11-09"]')).toHaveText('9 listopada 2023');
  const sources = page.locator('#zrodla .sources-list a');
  await expect(sources).toHaveCount(7);
  const sourceHosts = await sources.evaluateAll(links => links.map(link => new URL((link as HTMLAnchorElement).href).hostname));
  expect(sourceHosts.every(host => ['we.zut.edu.pl', 'www.zut.edu.pl'].includes(host))).toBe(true);
  const contact = page.locator('#kontakt');
  await expect(contact.getByRole('link', { name: 'Andrzej.Ziolkowski@zut.edu.pl' })).toHaveAttribute('href', 'mailto:Andrzej.Ziolkowski@zut.edu.pl');
  await expect(contact.getByRole('link', { name: '+48 91 449 51 03' })).toHaveAttribute('href', 'tel:+48914495103');
  const structured = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(structured['@type']).toBe('Person');
  expect(structured.name).toBe('Andrzej Ziółkowski');
  expect(structured.email).toBe('Andrzej.Ziolkowski@zut.edu.pl');
});

test('project cards lead to sourced research descriptions and retain their publication stage', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('heading', { name: 'Laserowe sterowanie wyładowaniem atmosferycznym' }).getByRole('link').click();
  await expect(page).toHaveURL(/\/projekty\/laserowe-sterowanie-wyladowaniem\/$/);
  await expect(page.getByRole('heading', { name: 'Aktualny etap: model przed walidacją' })).toBeVisible();
  await expect(page.locator('.prose')).toContainText('stan na 18 października 2026 r.');
  await expect(page.locator('.detail-figure figcaption')).toContainText('Nie jest fotografią eksperymentu');
  await expect(page.locator('.detail-figure img')).toHaveAttribute('src', /\.webp/);
  await page.goto('/projekty/');
  await page.getByRole('heading', { name: 'Wiązki Airy’ego w krysztale SBN' }).getByRole('link').click();
  await expect(page).toHaveURL(/\/projekty\/wiazki-airyego-w-krysztale-sbn\/$/);
  await expect(page.getByRole('heading', { name: 'Aktualny etap: projekt układu i plan badań' })).toBeVisible();
  await expect(page.locator('.prose')).toContainText('Nie zawiera wyników pomiarów');
  await expect(page.getByRole('main').locator('.project-meta .tag')).toHaveText('Planowany');
});

test('404 page and an unknown address provide a useful recovery path', async ({ page }) => {
  for (const { route, status } of [{ route: '/404.html', status: 200 }, { route: '/strona-ktora-nie-istnieje/', status: 404 }]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(status);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expectImagesLoaded(page);
    await expectNoHorizontalOverflow(page);
    await expectInternalLinksResolve(page);
    const recovery = page.getByRole('main').getByRole('link', { name: /główn/i });
    await expect(recovery).toHaveAttribute('href', '/');
    await recovery.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('SPEKTRUM');
  }
});

test('mobile navigation supports keyboard focus, Escape and page navigation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'The disclosure menu is visible below the desktop breakpoint.');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /menu/ });
  const navigation = page.getByRole('navigation', { name: 'Nawigacja mobilna' });
  await expect(navigation).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(navigation.getByRole('link').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(navigation).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Enter');
  await navigation.getByRole('link', { name: /O nas/ }).click();
  await expect(page).toHaveURL(/\/o-nas\/$/);
  await expect(navigation).toBeHidden();
  await expect(page.getByRole('button', { name: 'Otwórz menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('pulse explorer updates the graph and its accessible description with the keyboard', async ({ page }) => {
  const errors = captureErrors(page);
  await page.goto('/laser-femtosekundowy/');
  const slider = page.getByRole('slider', { name: /Czas trwania impulsu/ });
  const output = page.locator('[data-pulse-output]');
  const curve = page.locator('[data-pulse-curve]');
  await expect(slider).toHaveValue('100');
  await expect(slider).toHaveAttribute('aria-valuetext', '100 femtosekund');
  const initialCurve = await curve.getAttribute('d');
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('110');
  await expect(output).toHaveText('110 fs');
  await expect(slider).toHaveAttribute('aria-valuetext', '110 femtosekund');
  await expect(curve).not.toHaveAttribute('d', initialCurve!);
  await expect(page.locator('[data-pulse-description]')).toContainText('110 femtosekund');
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('20');
  await expect(output).toHaveText('20 fs');
  await page.keyboard.press('End');
  await expect(slider).toHaveValue('300');
  await expect(output).toHaveText('300 fs');
  await expect(slider).toHaveAttribute('aria-valuetext', '300 femtosekund');
  await expectNoHorizontalOverflow(page);
  expect(errors).toEqual([]);
});

test('reduced motion respects the preference while preserving the interactive model', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/laser-femtosekundowy/');
  expect(await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  const movingElements = await page.evaluate(() => Array.from(document.querySelectorAll('*')).filter(element => {
    const styles = getComputedStyle(element);
    return styles.animationDuration.split(',').some(duration => parseFloat(duration) > 0.001)
      || styles.transitionDuration.split(',').some(duration => parseFloat(duration) > 0.001);
  }).map(element => element.tagName));
  expect(movingElements).toEqual([]);
  const slider = page.getByRole('slider', { name: /Czas trwania impulsu/ });
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-pulse-output]')).toHaveText('110 fs');
});

test('compact 320px pages and landscape mobile navigation remain usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Run the compact mobile smoke test once.');
  await page.setViewportSize({ width: 320, height: 568 });
  for (const route of routes) {
    await test.step(`320px: ${route}`, async () => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expectNoHorizontalOverflow(page);
    });
  }

  await test.step('Landscape menu can reveal and activate its last item', async () => {
    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /menu/ });
    const navigation = page.getByRole('navigation', { name: 'Nawigacja mobilna' });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(navigation).toBeVisible();
    const lastLink = navigation.getByRole('link').last();
    await lastLink.scrollIntoViewIfNeeded();
    await expect(lastLink).toBeInViewport();
    await lastLink.click();
    await expect(page).toHaveURL(/\/dolacz\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Nawigacja mobilna' })).toBeHidden();
    await expectNoHorizontalOverflow(page);
  });
});
