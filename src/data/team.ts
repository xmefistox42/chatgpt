import { site } from './site';
import { supervisorProfile } from './supervisor';

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
    'Badacz optyki nieliniowej, materiałów fotorefrakcyjnych i numerycznego opisu propagacji światła. Profesor ZUT w Katedrze Telekomunikacji i Fotoniki oraz opiekun naukowy SPEKTRUM.',
  profileUrl: supervisorProfile.href,
};

// Dodaj wyłącznie potwierdzone dane członków i zdjęcia z uzyskaną zgodą na publikację.
// Zdjęcia umieszczaj w public/images/team, a src zapisuj jako /images/team/nazwa-pliku.webp.
export const members: TeamMember[] = [];
