import { site } from './site';

/** Verified against the public ZUT sources listed below, 2026-10-19. */
export const supervisorProfile = {
  name: 'Andrzej Ziółkowski',
  fullName: site.supervisor,
  href: '/zespol/andrzej-ziolkowski/',
  verifiedAt: '2026-10-19',
  department: 'Katedra Telekomunikacji i Fotoniki',
  introduction: 'Profesor ZUT, badacz optyki nieliniowej i opiekun naukowy SPEKTRUM. Łączy badania materiałów fotonicznych z modelowaniem tego, jak rozchodzi się w nich światło.',
  contact: {
    email: 'Andrzej.Ziolkowski@zut.edu.pl',
    phone: '+48 91 449 51 03',
    phoneHref: '+48914495103',
    office: 'C 103',
    address: 'ul. 26 Kwietnia 10, 71-126 Szczecin',
  },
  research: [
    {
      icon: 'optics',
      title: 'Optyka nieliniowa i fotorefrakcja',
      description: 'Bada materiały, w których odpowiedź optyczna zależy od oświetlenia, oraz możliwości wykorzystania tych zjawisk do sterowania propagacją światła.',
    },
    {
      icon: 'spark',
      title: 'Półprzewodniki i studnie kwantowe',
      description: 'Jego prace dotyczą m.in. GaAs, AlGaAs i InP oraz struktur wielokrotnych studni kwantowych, w których analizuje zjawiska wywoływane przez światło.',
    },
    {
      icon: 'network',
      title: 'Przetwarzanie sygnałów optycznych',
      description: 'Poszukuje zastosowań materiałów nieliniowych w przestrajalnych układach optycznych, w tym w przełączaniu i przetwarzaniu sygnałów świetlnych.',
    },
    {
      icon: 'wave',
      title: 'Modelowanie numeryczne',
      description: 'Rozwija metody obliczeniowe do badania zmian zachodzących podczas propagacji światła w półprzewodnikach fotorefrakcyjnych. Jego dorobek obejmuje badania teoretyczne i eksperymentalne.',
    },
  ],
  timeline: [
    {
      date: '2007',
      title: 'Początek pracy naukowej w Szczecinie',
      description: 'Biogram uczelniany wskazuje lata 2007–2008 jako okres pracy na stanowisku asystenta, a od 2009 r. — adiunkta. To historia zatrudnienia opisana w biogramie z 2023 r.',
      source: 'bio',
    },
    {
      date: '2008',
      title: 'Doktorat z wyróżnieniem',
      description: 'Obrona na Wydziale Fizyki Politechniki Warszawskiej. Rozprawa dotyczyła nieliniowej propagacji światła w fotorefrakcyjnym falowodzie z wielokrotnymi studniami kwantowymi.',
      source: 'bio',
    },
    {
      date: '2023-11-09',
      label: '9 listopada 2023',
      title: 'Nadanie stopnia doktora habilitowanego',
      description: 'Stopień w dziedzinie nauk inżynieryjno-technicznych, w dyscyplinie automatyka, elektronika, elektrotechnika i technologie kosmiczne, nadany przez właściwą Radę Dyscypliny ZUT.',
      source: 'habilitation',
    },
    {
      date: '2024-04-25',
      label: '25 kwietnia 2024',
      title: 'Wsparcie rozwoju młodych naukowców',
      description: 'Promotor pomocniczy rozprawy Błażeja Marii Jabłońskiego o dynamice pola elektrycznego w niejednorodnie oświetlonych fotorefrakcyjnych strukturach wielokrotnych studni kwantowych. Główną promotorką była Ewa Weinert-Rączka.',
      source: 'doctorates',
    },
  ],
  collaborations: [
    'Sieć Badawcza Łukasiewicz — Instytut Mikroelektroniki i Fotoniki w Warszawie',
    'Wydział Fizyki Politechniki Warszawskiej',
    'Instytut Fizyki Uniwersytetu Marii Curie-Skłodowskiej w Lublinie',
    'Centrum Badań Kosmicznych Polskiej Akademii Nauk w Warszawie',
  ],
  sources: [
    { id: 'club', label: 'SPEKTRUM i opiekun naukowy', publisher: 'Wydział Elektryczny ZUT', url: site.links.faculty },
    { id: 'bio', label: 'Biogram przy informacji o habilitacji', publisher: 'Wydział Elektryczny ZUT · 9.11.2023', url: 'https://we.zut.edu.pl/we-aktualnosci/article/habilitacja-dr-inz-andrzeja-ziolkowskiego.html' },
    { id: 'department', label: 'Afiliacja i służbowy kontakt', publisher: 'Katedra Telekomunikacji i Fotoniki ZUT', url: 'https://we.zut.edu.pl/o-wydziale/jednostki-organizacyjne/katedra-telekomunikacji-i-fotoniki.html' },
    { id: 'habilitation', label: 'Dokumentacja postępowania habilitacyjnego', publisher: 'Wydział Elektryczny ZUT', url: 'https://we.zut.edu.pl/o-wydziale/dzialalnosc-naukowa/habilitacje.html' },
    { id: 'doctorates', label: 'Postępowanie doktorskie Błażeja Marii Jabłońskiego', publisher: 'Wydział Elektryczny ZUT', url: 'https://we.zut.edu.pl/o-wydziale/dzialalnosc-naukowa/doktoraty.html' },
    { id: 'teaching', label: 'Komisja Programowa kierunku Elektrotechnika', publisher: 'Wydział Elektryczny ZUT', url: 'https://we.zut.edu.pl/o-wydziale/jakosc-ksztalcenia/wydzialowe-komisje-programowe.html' },
    { id: 'council', label: 'Skład Rady Dyscypliny', publisher: 'Zachodniopomorski Uniwersytet Technologiczny w Szczecinie', url: 'https://www.zut.edu.pl/rady-dyscyplin/rady-dyscyplin/rada-dyscypliny-automatyka-elektronika-elektrotechnika-i-technologie-kosmiczne.html' },
  ],
};
