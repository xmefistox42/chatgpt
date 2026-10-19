# SPEKTRUM · Przekraczamy granice światła

Responsywna strona Studenckiego Koła Naukowego SPEKTRUM przy Wydziale
Elektrycznym ZUT w Szczecinie. Astro 7, TypeScript w trybie strict, Tailwind CSS 4,
statyczne HTML i lekkie SVG. Bez backendu, zewnętrznych fontów, analityki i formularzy
udających wysyłkę. Dostarczone logo jest w `public/brand/`.

## Uruchomienie

Wymagany Node.js co najmniej 22.22.0; projekt przygotowano na **24.19.0**
(plik `.node-version`). Wszystkie polecenia wykonuj w katalogu projektu.

```sh
npm ci
npm run dev
```

Adres uruchomienia wyświetla Astro w terminalu. Zatrzymanie: `Ctrl+C`.

```sh
npm run check     # TypeScript, komponenty Astro i schematy treści
npm run build     # produkcyjne HTML/CSS/JS w dist/
npm run preview   # lokalna kontrola produkcyjnej wersji
npm run test:e2e  # testy przeglądarkowe po buildzie
```

Testy potrzebują Chromium. Na tej maszynie używają `/usr/bin/chromium`.
Na innym komputerze wykonaj `npx playwright install chromium`, albo ustaw
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` na zainstalowaną przeglądarkę.
Przed testami zatrzymaj swój serwer deweloperski na porcie 4321 — testy
uruchamiają tam podgląd produkcyjny. Jeśli Astro uruchomił proces w tle, użyj
`npx astro dev stop` (odpowiednio `npx astro preview stop` dla podglądu).

Zakres wykonanych kontroli opisuje [raport weryfikacji](docs/WERYFIKACJA.md).

W środowisku chmurowym z niedostępnym katalogiem domowym używaj:

```sh
export NPM_CONFIG_CACHE=/workspace/.cache/npm
export ASTRO_TELEMETRY_DISABLED=1
export XDG_CONFIG_HOME=/workspace/.cache/config
cd /workspace/chatgpt
npm ci
npm run check
npm run build
npm run dev
```

## Gdzie zmieniać treści

| Co chcesz zmienić | Plik lub katalog |
| --- | --- |
| Nazwa, opiekun, oficjalne linki, ścieżka do logo, e-mail | `src/data/site.ts` |
| Opisy i sekcje strony głównej | `src/pages/index.astro` |
| Projekty i aktualności | `src/content/projects/` i `src/content/news/` |
| Skład zespołu | `src/data/team.ts` |
| Galeria autentycznych zdjęć laboratorium | `src/data/laboratory.ts` |
| Informacje o laserze i karta stanowiska | `src/pages/laser-femtosekundowy.astro` |
| Kolory, fonty, odstępy i współdzielone klasy | `src/styles/global.css` |
| Nawigacja | `src/data/site.ts` i `src/components/Header.astro` |

### Dodawanie projektu lub aktualności

Otwórz [instrukcję redakcyjną](docs/TRESCI.md), skopiuj odpowiedni szablon do
nowego pliku `.md`, uzupełnij go rzeczywistymi danymi i ustaw `published: true`.
Nazwa pliku stanie się końcówką adresu. Uruchom `npm run check`, `npm run build`
i obejrzyj wpis przed publikacją. Nie trzeba zmieniać komponentów strony.

Opublikowano dwa projekty na podstawie dostarczonych materiałów:
laserowe sterowanie wyładowaniem atmosferycznym oraz wiązki Airy’ego w SBN.
Daty wpisów oznaczają publikację opisu, nie rozpoczęcie badań.
Aktualności pozostają puste; ostrzeżenia Astro o pustej kolekcji `news`
oznaczają brak wpisów, a nie błąd instalacji. Trasy szczegółowe powstają dla
opublikowanych wpisów. Szkice nie pojawiają się na listach ani w wynikowym HTML.

Obrazy projektów umieszczaj w `src/assets/projects/` i wskaż je w polu `image`
ścieżką względną z pliku Markdown, np. `../../assets/projects/nazwa.png`.
Astro tworzy responsywne wersje WebP grafik rastrowych; SVG jest wyświetlane
bez rasteryzacji. Dodaj `imageAlt` oraz podpis `imageCaption`, szczególnie gdy
grafika przedstawia schemat lub wizualizację koncepcyjną.

### Zdjęcia i logo

Wgraj własne zdjęcia do `public/images/laboratory/` lub `public/images/team/`.
Dodaj ich ścieżki i rzeczowe opisy `alt` w odpowiednim pliku danych. Publikuj
wyłącznie zdjęcia ze zgodą i ustalonym autorstwem. Puste galerie pokazują jawne
miejsca na materiał; grafiki poglądowe nie udają zdjęć aparatury.

Aby zmienić logo, dodaj nowy plik w `public/brand/` i zmień `site.brand.logo`,
`site.brand.png` oraz wymiary w `src/data/site.ts`. Wersja WebP służy do
wyświetlania, PNG do udostępniania. Mała nawigacja pozostaje czytelnym napisem.
Alternatywy z paczki zachowano w `public/brand/alternatywy/`. Nie użyto logo ZUT.

### Kontakt i informacje do zatwierdzenia

Oficjalny adres koła nie został podany. Po zatwierdzeniu wpisz go w
`site.contactEmail`; strona kontaktowa wyświetli działający odnośnik `mailto:`.
Nie ma formularza wymagającego serwera. Kontakt może działać przez pocztę
użytkownika po dodaniu adresu.

Skład koła, fotografie, model i parametry aparatury oraz aktualności
wymagają rzeczywistych materiałów. Opisy dwóch projektów bazują na prezentacji
i PDF-ie przekazanych przez koło; rozróżniają plan badań i etap przed walidacją.
Miejsca do uzupełnienia są opisane na stronie.
Nie publikujemy fikcyjnych wyników, dat, parametrów ani osób.

## Podstrony

`/`, `/o-nas/`, `/laboratorium/`, `/laser-femtosekundowy/`, `/projekty/`,
`/projekty/[slug]/`, `/zespol/`, `/aktualnosci/`, `/aktualnosci/[slug]/`,
`/dolacz/`, `/kontakt/` oraz `404.html`.

Model impulsu przedstawia unormowaną gaussowską obwiednię **natężenia**:
`I/Imax = exp[-4 ln(2) (t/τ)²]`. Suwak ustala FWHM `τ` (20–300 fs).
Maksimum pozostaje równe 1, zatem pole pod krzywą nie jest stałe. Jest to
ilustracja edukacyjna, nie pomiar ani symulacja konkretnego urządzenia.

## Wdrożenie na Vercel

1. Kod projektu znajduje się w repozytorium GitHub
   [xmefistox42/chatgpt](https://github.com/xmefistox42/chatgpt), w gałęzi `main`.
2. Zaimportuj repozytorium w Vercel. Wybierz framework **Astro**, polecenie
   `npm run build`, katalog wynikowy `dist`, Node.js 24.x.
3. Jeśli korzystasz z własnej domeny, dodaj zmienną `PUBLIC_SITE_URL`, np.
   `https://twoja-domena.example` (zastąp prawdziwym adresem, bez ścieżki).
   Przy standardowym wdrożeniu Vercel adres odczytywany jest automatycznie
   z `VERCEL_PROJECT_PRODUCTION_URL` lub `VERCEL_URL`.
4. Uruchom wdrożenie i sprawdź podstrony, grafikę logo, menu mobilne, suwak,
   `/robots.txt` oraz `/sitemap-index.xml`.

`PUBLIC_SITE_URL` ustawia adresy canonical i Open Graph oraz generuje sitemapę.
Lokalny build bez domeny pomija bezwzględne metadane i sitemapę, żeby nie
publikować zmyślonego adresu. Statyczny projekt nie wymaga adaptera Vercel ani
sekretów. `vercel.json` zawiera konfigurację builda i podstawowe nagłówki.
Publikacja strony i publikacja konfiguracji środowiska chmurowego są osobnymi
czynnościami; żadna nie jest wykonywana przez `npm run build`.

## Kontrole jakości

Playwright sprawdza desktop i mobile, kluczowe podstrony, działanie menu,
klawiaturę i zmiany wykresu. Axe sprawdza automatycznie reguły dostępności
WCAG 2.2 AA. Automatyczne testy nie zastępują pełnego audytu WCAG z czytnikiem
ekranu. Preferencja ograniczonego ruchu wyłącza dekoracyjne animacje.

Fonty są hostowane lokalnie. Strona nie ładuje przypadkowych fotografii ani
zewnętrznych bibliotek interfejsu w przeglądarce. JavaScript obsługuje jedynie
menu i interaktywny model impulsu. GitHub Actions uruchamia check, build i testy
przeglądarkowe dla pushów i pull requestów.

## Źródła i weryfikacja

Informacje organizacyjne pochodzą z przekazanego zlecenia. Oficjalne odnośniki:

- https://we.zut.edu.pl/o-wydziale/samorzad-i-kola-naukowe.html
- https://foton.zut.edu.pl/
- https://www.zut.edu.pl/

Podczas wykonania dostęp do tych stron blokował proxy środowiska (403), dlatego
nie deklarujemy niezależnej weryfikacji ich aktualnej treści. Przed publikacją
potwierdź nazwę jednostki, opiekuna i opis dostępnego systemu na stronach ZUT.
Materiały z ZIP wykorzystano jako dostarczoną identyfikację wizualną, bez
kopiowania fotografii z serwisów uczelni.
