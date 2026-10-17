import { site } from './site';

export interface TeamMember {
  name: string;
  role: string;
  description?: string;
  image?: { src: string; alt: string };
  profileUrl?: string;
}

export const supervisor: TeamMember = {
  name: site.supervisor,
  role: 'Opiekun naukowy koła',
  description:
    'Opiekun naukowy Studenckiego Koła Naukowego SPEKTRUM przy Wydziale Elektrycznym Zachodniopomorskiego Uniwersytetu Technologicznego w Szczecinie.',
};

// Dodaj wyłącznie potwierdzone dane członków i zdjęcia z uzyskaną zgodą na publikację.
// Zdjęcia umieszczaj w public/images/team, a src zapisuj jako /images/team/nazwa-pliku.webp.
export const members: TeamMember[] = [];
