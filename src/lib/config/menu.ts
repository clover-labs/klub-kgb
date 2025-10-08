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

export const menuConfig: MenuItem[] = [
	{
		label: "Karte",
		href: "https://olaii.com/organizer/866/klub-kgb",
		external: true,
	},
	{
		label: "Klub",
		children: [
			{
				label: "Dogodki",
				section: true,
				children: [
					{
						label: "Prihajajoči dogodki",
						href: "/events/upcoming",
						description: "Oglejte si naše aktualne in prihajajoče dogodke",
					},
					{
						label: "Arhiv dogodkov",
						href: "/events/archive",
						description: "Arhiv preteklih dogodkov in nastopov",
					},
				],
			},
			{
				label: "Vsebina",
				section: true,
				children: [
					{
						label: "Novice",
						href: "/news",
						description: "Najnovejše novice in objave iz kluba",
					},
					{
						label: "Izvajalci",
						href: "/artists",
						description: "Spoznajte izvajalce, ki nastopajo pri nas",
					},
				],
			},
			{
				label: "O klubu",
				section: true,
				children: [
					{
						label: "O nas",
						href: "/about",
						description: "Spoznajte Klub KGB in našo zgodbo",
					},
					{
						label: "Kontakt",
						href: "/contact",
						description: "Stopite v stik z nami",
					},
				],
			},
		],
	},
];

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
