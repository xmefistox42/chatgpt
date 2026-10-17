export interface LaboratoryPhoto {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
}

// Dodaj autentyczne, zatwierdzone zdjęcia laboratorium do public/images/laboratory.
// Pusta tablica świadomie wyświetla miejsca na fotografie zamiast zdjęć zastępczych.
export const laboratoryPhotos: LaboratoryPhoto[] = [];

export const laboratoryPhotoSlots = [
  {
    title: 'Przestrzeń laboratorium',
    caption: 'Miejsce na autentyczne zdjęcie Laboratorium Technologii Teleinformatycznych i Fotoniki.',
  },
  {
    title: 'Stanowisko badawcze',
    caption: 'Miejsce na zdjęcie aparatury wraz z opisem jej zastosowania.',
  },
  {
    title: 'Praca przy eksperymencie',
    caption: 'Miejsce na fotografię działań koła, opublikowaną za zgodą uczestników.',
  },
];
