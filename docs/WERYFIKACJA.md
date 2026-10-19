# Weryfikacja pierwszej wersji

## Profil opiekuna — 19.10.2026

- Dodano `/zespol/andrzej-ziolkowski/` oraz wejścia ze strony głównej, zespołu
  i kontaktu. Fakty pochodzą z siedmiu odczytanych oficjalnych stron ZUT;
  źródła, daty i granice interpretacji zawiera `docs/ZRODLA_OPIEKUNA.md`.
- `npm run check`: 0 błędów, ostrzeżeń i podpowiedzi.
- `npm run build`: powodzenie; 13 stron HTML (12 publicznych widoków i 404).
- `npm run test:e2e`: 36 testów zaliczonych, 2 kontrole mobilne pominięte
  wyłącznie na desktopie, 0 niepowodzeń.
- Nowy profil przeszedł testy linków, axe, klawiatury i szerokości 320 px.
  Sprawdzono przejście z zespołu, nadanie habilitacji, źródła uczelniane,
  odnośniki mailto/tel oraz dane strukturalne Person.
- Opis historii z biogramu z 2023 r. oddzielono od bieżącej afiliacji i danych
  kontaktowych. Bieżący katalog katedry potwierdza stanowisko profesora ZUT.

## Aktualizacja projektów — 19.10.2026

- Dodano dwie publiczne podstrony projektów, karty na stronie głównej i listę
  projektów z rzeczywistymi materiałami źródłowymi.
- Zachowano oryginał przesłanej grafiki, a Astro przygotowuje responsywne WebP.
  Podpis rozróżnia wizualizację koncepcyjną od pomiaru i wyniku symulacji.
- Schemat wiązek Airy’ego pozostaje SVG bez rasteryzacji i jest opisany jako
  planowany układ. Stan obu projektów wynika z prezentacji i PDF-u.
- `npm run check`: 0 błędów, ostrzeżeń i podpowiedzi.
- `npm run build`: powodzenie; 12 stron HTML (11 publicznych widoków i 404).
- `npm run test:e2e`: 32 testy zaliczone, 2 celowo pominięte na desktopie
  (kontrole mobilne); 0 niepowodzeń. Obie nowe podstrony przeszły sprawdzanie
  linków, obrazów, dostępności axe i szerokości 320 px.
- Sprawdzono przejście z kart do opisów, statusy projektów, datę stanu modelu
  oraz podpis i zoptymalizowany obraz na stronie projektu laserowego.

Źródła i zakres informacji opisuje `docs/ZRODLA_PROJEKTOW.md`.

## Kontrole pierwszej wersji

Wykonane kontrole w środowisku Node.js 24.19.0, npm 11.9.0 i Chromium:

- Czyste `npm ci` — powodzenie; suma kontrolna lockfile bez zmian.
- `npm run check` — 0 błędów, 0 ostrzeżeń, 0 podpowiedzi.
- `npm run build` — powodzenie, 10 stron HTML (9 publicznych widoków i 404).
- `npm run test:e2e` — 26 testów zaliczonych, 2 celowo pominięte na desktopie
  (menu mobilne oraz dodatkowy widok 320 px/landscape); 0 niepowodzeń.

Testy przeglądarkowe obejmują wszystkie opublikowane widoki na desktopie i
telefonie: odpowiedzi HTTP, jeden nagłówek h1, strukturę main, ładowanie obrazów,
odnośniki wewnętrzne i fragmenty, brak błędów JavaScript oraz brak poziomego
przepełnienia. Dodatkowo sprawdzają wszystkie podstrony przy szerokości 320 px,
przewijanie menu w landscape, klawiaturę, Escape, stronę 404, suwak FWHM,
aktualizację SVG i opisu dostępności oraz preferencję ograniczonego ruchu.

Axe nie wykrył naruszeń sprawdzanych reguł WCAG 2.0/2.1/2.2 A i AA na 9
normalnych stronach w obu głównych rozmiarach. To automatyczna kontrola,
nie certyfikat pełnej zgodności WCAG ani test z czytnikiem ekranu.

## Treści i SEO

W osobnej kopii projektu, bez dodawania fikcyjnych wpisów do repozytorium:

- Opublikowany projekt i aktualność trafiły na listy i wygenerowały detale.
- Markdown, obrazy, opisy alt i daty zadziałały prawidłowo.
- Szkice jawne i domyślne nie trafiły do żadnego wynikowego HTML.
- Brak `imageAlt` przy podanym obrazie poprawnie zatrzymał build obu kolekcji.
- Przy testowym `PUBLIC_SITE_URL=https://example.org` canonical, Open Graph,
  robots i sitemap zawierały prawidłowe adresy. Sitemap pomijał szkice i 404.
- Ustawienie testowego adresu z domeny example.org wyświetliło prawidłowy
  odnośnik mailto zamiast stanu kontaktu w przygotowaniu.

Testowe dane oraz domena example.org nie znajdują się w publicznych treściach
rzeczywistego projektu. Lokalny build bez docelowej domeny świadomie pomija
canonical i sitemapę. Vercel wykrywa adres wdrożenia podczas swojego builda.

## Uruchomienie i ograniczenia

Przetestowano start serwera deweloperskiego i lokalne odpowiedzi HTTP ze strony
głównej, podstrony lasera oraz listy projektów. Procesy trzeba ponownie uruchamiać
w nowym środowisku; instrukcje instalacji i startu zapisano w szkicu konfiguracji
środowiska chmurowego. Zapis szkicu nie jest publikacją środowiska ani strony.

Oficjalne serwisy `we.zut.edu.pl`, `foton.zut.edu.pl`, `www.zut.edu.pl` oraz
`docs.astro.build` zwracały blokadę proxy 403. Dodano te domeny do szkicu polityki
sieciowej; ustawienia trzeba przejrzeć, zapisać i opublikować w interfejsie
środowiska. Informacje organizacyjne pochodzą z dostarczonego zlecenia i wymagają
potwierdzenia przed publikacją. Nie podano nieznanego adresu koła, parametrów
konkretnego lasera, fikcyjnych osób, wydarzeń, wyników ani fotografii.

Kod źródłowy jest dostępny w repozytorium `xmefistox42/chatgpt`, w gałęzi `main`.
Nie wykonano wdrożenia strony na Vercel.
