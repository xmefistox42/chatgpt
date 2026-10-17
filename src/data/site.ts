/** Central identity and confirmed links. No invented contact details. */
export const site = {
  name: 'SPEKTRUM',
  fullName: 'Studenckie Koło Naukowe SPEKTRUM',
  university: 'Zachodniopomorski Uniwersytet Technologiczny w Szczecinie',
  faculty: 'Wydział Elektryczny',
  laboratory: 'Laboratorium Technologii Teleinformatycznych i Fotoniki',
  supervisor: 'dr hab. inż. Andrzej Ziółkowski, prof. ZUT',
  description: 'Przekraczamy granice światła. Poznaj fotonikę, lasery i ultrakrótkie impulsy ze Studenckim Kołem Naukowym SPEKTRUM na ZUT w Szczecinie.',
  brand: { logo: '/brand/logo-spektrum.webp', png: '/brand/logo-spektrum.png', width: 1254, height: 1254 },
  links: {
    university: 'https://www.zut.edu.pl/',
    faculty: 'https://we.zut.edu.pl/o-wydziale/samorzad-i-kola-naukowe.html',
    laboratory: 'https://foton.zut.edu.pl/',
  },
  // Add only the official, approved public contact. Empty until confirmed.
  contactEmail: '',
};

export const navigation = [
  { href: '/o-nas/', label: 'O nas' },
  { href: '/laser-femtosekundowy/', label: 'Laser femtosekundowy' },
  { href: '/laboratorium/', label: 'Laboratorium' },
  { href: '/projekty/', label: 'Projekty' },
  { href: '/aktualnosci/', label: 'Aktualności' },
];
