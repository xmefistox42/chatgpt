# Publikowanie projektów i aktualności

Strona używa Astro Content Collections. Definicje i walidacja pól znajdują się
w `src/content.config.ts`. Treść wpisu to Markdown, a metadane znajdują się
w nagłówku YAML pomiędzy liniami `---`.

Kolekcja projektów zawiera dwa opisy opracowane na podstawie dostarczonej
prezentacji i PDF-u. Aktualności pozostają puste. Nie publikujemy przykładowych
wydarzeń, dat badań ani wyników jako informacji o działalności koła.
Poniższe szablony są szkicami do uzupełnienia prawdziwymi danymi.

## Pliki i adresy

- Projekt: `src/content/projects/nazwa-projektu.md` → `/projekty/nazwa-projektu/`.
- Aktualność: `src/content/news/tytul-wiadomosci.md` → `/aktualnosci/tytul-wiadomosci/`.
- Umieszczaj pliki `.md` bezpośrednio w odpowiednim katalogu, bez podkatalogów.
- Nazwy plików zapisuj małymi literami, bez polskich znaków, ze słowami
  oddzielonymi myślnikami. Nazwa pliku określa `id` wpisu i jego adres.
- Nie dodawaj osobnego pola `slug`; trasy używają `entry.id` zwracanego przez
  loader `glob` Astro.

## Metadane

| Pole | Wymagane | Znaczenie |
| --- | --- | --- |
| `title` | Tak | Niepusty tytuł wpisu. |
| `description` | Tak | Niepusty skrót na liście i opis SEO. |
| `published` | Nie | `true` publikuje wpis; domyślnie `false`. |
| `date` | Tak | Data publikacji opisu w formacie `RRRR-MM-DD`, zapisana w cudzysłowie; nie data rozpoczęcia projektu. |
| `tags` | Nie | Lista niepustych etykiet; domyślnie `[]`. |
| `image` | Nie | Projekt: ścieżka względna do pliku w `src/assets/projects/`, np. `../../assets/projects/nazwa.png`. Aktualność: ścieżka w `public` lub adres obrazu. |
| `imageAlt` | Wraz z `image` | Opis treści obrazu dla osób korzystających z czytnika ekranu. |
| `imageCaption` | Tylko projekt, opcjonalne | Publiczny podpis określający m.in. czy grafika jest zdjęciem, schematem czy wizualizacją. |
| `status` | Tylko projekt | Jedna z wartości: `planowany`, `w-trakcie`, `zakonczony`. |

`image` i `imageAlt` należy dodać razem albo pominąć oba pola. Nie zapisuj
alternatywnego opisu jako pustego tekstu. Obraz musi być własny lub używany
zgodnie z licencją; przed publikacją sprawdź, czy faktycznie się ładuje.
Grafiki rastrowe projektów są automatycznie optymalizowane do responsywnych
wersji WebP. Grafiki SVG są wyświetlane w oryginalnej formie. Stan badań
z datą źródłową podawaj osobno w treści, aby nie mylić go z datą publikacji wpisu.

Listy pokazują wyłącznie wpisy z `published: true`, od najnowszych do
najstarszych. Strony szczegółowe powstają wyłącznie dla opublikowanych wpisów.
Jeśli żadnego nie ma, listy wyświetlają przygotowany pusty stan.

**Szkice są częścią repozytorium.** `published: false` wyłącza publiczną
stronę wpisu, lecz nie służy do przechowywania poufnych informacji. Nie dodawaj
danych osobowych, haseł ani innych sekretów do Markdown.

## Szablon projektu

Skopiuj poniższy blok do `src/content/projects/nazwa-projektu.md`. Zastąp tytuł,
opis, datę i treść potwierdzonymi informacjami. Data w szablonie jest wyłącznie
wartością techniczną do zastąpienia. Zachowaj `published: false` do czasu
sprawdzenia kompletnego wpisu przez osobę odpowiedzialną za publikację.

```markdown
---
title: "[Uzupełnij prawdziwy tytuł projektu]"
description: "[Uzupełnij krótki opis celu i zakresu projektu]"
published: false
date: "2000-01-01"
status: planowany
tags: []
---

## Cel projektu

[Opisz problem lub pytanie badawcze.]

## Co robimy

[Opisz rzeczywisty zakres prac i zastosowane metody.]

## Aktualny etap

[Podaj potwierdzone informacje o postępach.]

## Jak dołączyć

[Dodaj uzgodniony sposób kontaktu lub odnośnik do strony /dolacz/.]
```

## Szablon aktualności

Skopiuj poniższy blok do `src/content/news/tytul-wiadomosci.md`. Przed publikacją
zastąp datę techniczną rzeczywistą datą wpisu i zweryfikuj wszystkie szczegóły.

```markdown
---
title: "[Uzupełnij prawdziwy tytuł wiadomości]"
description: "[Uzupełnij krótkie podsumowanie wiadomości]"
published: false
date: "2000-01-01"
tags: []
---

[Napisz najważniejszą informację: co się wydarzyło lub co ogłaszamy.]

## Szczegóły

[Dodaj potwierdzone daty, miejsce, przebieg lub wyniki, zależnie od tematu.]

[Jeśli to potrzebne, zakończ informacją o następnym kroku i prawdziwym odnośnikiem.]
```

## Publikacja

1. Uzupełnij szkic prawdziwymi informacjami i usuń wszystkie nawiasy z instrukcjami.
2. Sprawdź datę, status projektu, tekst, linki i ewentualny obraz z opisem.
3. Ustaw `published: true`.
4. Uruchom `npm run check` i `npm run build`. Błąd schematu wskaże plik i pole
   wymagające poprawy.
5. Sprawdź listę i stronę szczegółową w `npm run dev` lub po `npm run preview`.

Markdown zaczynaj od nagłówka `##` — tytuł strony jest już nagłówkiem `h1`.
Nie dodawaj surowego HTML, skryptów ani zasobów z niezweryfikowanych źródeł.
