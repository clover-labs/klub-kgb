import * as m from "$lib/paraglide/messages";

export interface MenuItem {
  label: string;
  href?: string;
  icon?: string; // SVG path or icon name
  description?: string;
  external?: boolean;
  children?: MenuItem[];
  section?: boolean; // Indicates if this is a section header
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export function getMenuConfig(): MenuItem[] {
  return [
    {
      label: m.nav_tickets(),
      href: "https://olaii.com/organizer/866/klub-kgb",
      external: true,
    },
    {
      label: m.nav_club(),
      children: [
        {
          label: m.nav_events(),
          section: true,
          children: [
            {
              label: m.nav_upcoming_events(),
              href: "/events/upcoming",
              description: m.events_upcoming_desc(),
            },
            {
              label: m.nav_events_archive(),
              href: "/events/archive",
              description: m.events_archive_desc(),
            },
          ],
        },
        {
          label: m.nav_content(),
          section: true,
          children: [
            {
              label: m.nav_news(),
              href: "/news",
              description: "Najnovejše novice in objave iz kluba",
            },
            {
              label: m.nav_artists(),
              href: "/artists",
              description: "Spoznajte izvajalce, ki nastopajo pri nas",
            },
          ],
        },
        {
          label: m.nav_about_club(),
          section: true,
          children: [
            {
              label: m.nav_about(),
              href: "/about",
              description: "Spoznajte Klub KGB in našo zgodbo",
            },
            {
              label: m.nav_contact(),
              href: "/contact",
              description: "Stopite v stik z nami",
            },
            {
              label: m.nav_faq(),
              href: "/faq",
              description: "Pogosta vprašanja",
            },
            {
              label: m.nav_venue_rental(),
              href: "/venue-rental",
              description: "Najem prostora",
            },
            {
              label: m.nav_about_club(),
              href: "/venue",
              description: "O prostoru",
            },
          ],
        },
      ],
    },
  ];
}

// Helper function to check if a menu item has children
export function hasSubmenu(item: MenuItem): boolean {
  return !!(item.children && item.children.length > 0);
}

// Helper function to check if item is a section header
export function isSection(item: MenuItem): boolean {
  return item.section === true;
}

// Helper function to get all menu items with submenus
export function getMenusWithSubmenus(): MenuItem[] {
  return menuConfig.filter(hasSubmenu);
}

// Helper to get sections from a menu item
export function getSections(item: MenuItem): MenuItem[] {
  if (!item.children) return [];
  return item.children.filter((child) => child.section);
}

// Helper to flatten all menu items (for mobile)
export function flattenMenuItems(items: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  for (const item of items) {
    if (item.children && !item.section) {
      result.push(...flattenMenuItems(item.children));
    } else if (!item.section) {
      result.push(item);
    }
  }
  return result;
}
