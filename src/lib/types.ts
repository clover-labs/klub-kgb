export interface Performer {
  performer_name: string;
  performer_role?: string;
}

export interface BlogPost {
  id: number;
  status: string;
  date_created: string;
  date_updated: string;
  image: string; // This will be the file ID from Directus
  title: string;
  description: string;
  content?: string;
  event_date: string;
  link: string;
  slug?: string; // Optional: URL-friendly slug from Directus, or generated from title
  artist_description?: string; // About the artist/performer
  performers?: Performer[]; // List of performers/members
  ticket_status?: 'available' | 'coming_soon' | 'sold_out' | 'free_entry'; // Ticket availability status
  event_language?: string; // Event language (e.g., "English", "Slovenščina", "Deutsch")
}

export interface NewsletterForm {
  email: string;
}

export interface Artist {
  id: number;
  status: string;
  date_created: string;
  date_updated: string;
  first_name?: string;
  last_name?: string;
  stage_name: string;
  slug?: string;
  image?: string;
  genre?: string[]; // Array of genre values
  category?: string;
  country?: string;
  description?: string;
  bio?: string;
  website?: string;
  spotify?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  upcoming_events?: BlogPost[];
  past_events?: BlogPost[];
  associated_acts?: Artist[];
}

export interface News {
  id: number;
  status: string;
  date_created?: string;
  date_updated?: string;
  date_published?: string;
  title: string;
  slug?: string;
  description?: string;
  content?: string;
  image?: string;
  related_event?: BlogPost; // M2O relationship to events
}

export interface FAQ {
  id: number;
  status: string;
  date_created?: string;
  date_updated?: string;
  question: string;
  answer: string;
  important_note?: string;
  warning_note?: string;
  tip_note?: string;
  info_note?: string;
  category: 'dogodki' | 'sedezi-mize' | 'nastopi-najem';
  sort?: number;
  slug: string;
  is_featured?: boolean;
}
