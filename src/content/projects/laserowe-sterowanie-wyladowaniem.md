---
title: "Laserowe sterowanie wyładowaniem atmosferycznym"
description: "Sprzężony model lasera, plazmy i pola elektrycznego w COMSOL. Badamy koncepcję kierowania wyładowaniem za pomocą kanału indukowanego laserem; model v3b-beta jest przed pierwszą walidacją."
published: true
date: "2026-10-19"
status: w-trakcie
tags: ["Lasery", "Plazma", "Modelowanie", "COMSOL"]
image: "../../assets/projects/kanal-plazmowy-laser.png"
imageAlt: "Wizualizacja koncepcyjna czerwonej wiązki laserowej skupiającej się w jasnym punkcie i tworzącej wydłużony, fioletowy kanał plazmowy."
imageCaption: "Wizualizacja koncepcyjna z prezentacji projektu. Nie jest fotografią eksperymentu ani zweryfikowanym wynikiem symulacji."
---

## Nie zatrzymać pioruna. Wskazać mu drogę.

Czy kanał plazmowy indukowany laserem może pomóc kontrolować rozwój wyładowania
i jego punkt przyłączenia? To pytanie stoi za projektem przedstawionym przez
**SPEKTRUM × AK SEP** w prezentacji Wiktora Demczyny i Pawła Ruhsa.

Laser może zmieniać lokalne warunki jonizacji i przebicia w powietrzu. Celem
badań jest opisanie warunków, w których taki kanał mógłby wyznaczać kontrolowaną
ścieżkę wyładowania do wybranej strefy. To koncepcja badawcza potencjalnie
uzupełniająca klasyczną ochronę odgromową.

## Aktualny etap: model przed walidacją

Według prezentacji, **stan na 18 października 2026 r.** to model **v3b-beta**
przygotowany do pierwszego uruchomienia i walidacji w **COMSOL 6.3**. Przyjęto
geometrię dwuwymiarową osiowosymetryczną oraz opis transportu ładunków i pola
zależny od czasu.

**Nie przedstawiamy jeszcze zweryfikowanych wyników symulacji, demonstratora
ani działającego systemu ochrony odgromowej.** Obecny opis dotyczy architektury
modelu i planu jego sprawdzenia.

## Trzy fizyki w jednej pętli

1. **Propagacja wiązki laserowej.** Paraksjalny model obwiedni uwzględnia
   dyfrakcję, samofokusowanie Kerra, rozogniskowanie przez plazmę oraz absorpcję
   kolizyjną opisywaną modelem Drudego.
2. **Transport ładunków.** Elektrony oraz jony dodatnie i ujemne opisuje transport
   dryfowo-dyfuzyjny, z procesami jonizacji, przyłączania elektronów i rekombinacji.
3. **Pole elektryczne.** Równanie Poissona wiąże ładunek przestrzenny z potencjałem
   i polem. Pole wpływa na transport i reakcje, a powstająca plazma zmienia
   propagację światła.

Część optyczna opisuje propagację wzdłuż osi wiązki w przybliżeniu
quasi-statycznym. Nie jest to pełna symulacja czasowego kształtu impulsu
femtosekundowego ani jego dyspersji prędkości grupowej.

## Co trzeba sprawdzić

- Zbieżność obliczeń oraz zależność rozwiązania od siatki i kroku czasowego.
- Fizyczne skale gęstości elektronów, pola, promienia kanału i czasu jego zaniku.
- Wrażliwość na warunki brzegowe i przyjęte uproszczenia optyczne.
- Kalibrację transportu i reakcji dla powietrza, w tym ich zależność od
  zredukowanego pola elektrycznego E/N.

Dopiero stabilne numerycznie rozwiązania zgodne ze skalami z literatury mogą
stanowić podstawę do zaprojektowania kontrolowanego demonstratora laboratoryjnego.

## Perspektywa zastosowań

Prezentacja wskazuje infrastrukturę startową sektora kosmicznego, stacje bazowe
telekomunikacji oraz wybrane obiekty energetyczne i przemysłowe jako możliwe
przyszłe obszary zastosowań. Są to **scenariusze rozwoju**, a nie wdrożenia koła
ani potwierdzona skuteczność ochrony. Projekt nie zastępuje projektowania
klasycznych instalacji odgromowych.

## Materiały i kontekst naukowy

- Prezentacja „Sterowanie wyładowaniem atmosferycznym kanałem plazmowym
  indukowanym laserem”, SPEKTRUM × AK SEP, Wiktor Demczyna i Paweł Ruhs;
  opis modelu według stanu na 18.10.2026.
- Houard i współautorzy, „Laser-guided lightning”, *Nature Photonics* 17,
  231–235 (2023), [DOI: 10.1038/s41566-022-01139-z](https://doi.org/10.1038/s41566-022-01139-z).
  To publikacja innego zespołu stanowiąca punkt odniesienia, nie wynik SPEKTRUM.

Poznaj również [technologię ultrakrótkich impulsów](/laser-femtosekundowy/)
i [zaplecze laboratoryjne koła](/laboratorium/).
