/**
 * Table of Contents utilities
 * Handles intersection observer logic and scroll behavior
 */

export interface TocSection {
	id: string;
	title: string;
	color?: string;
	subsections?: TocSection[];
}

/**
 * Get the currently active section based on scroll position
 * Uses Intersection Observer API to detect which section is in viewport
 */
export function observeSections(
	sectionIds: string[],
	callback: (activeSectionId: string) => void,
	options: IntersectionObserverInit = {}
): IntersectionObserver {
	const defaultOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
		threshold: 0,
		...options
	};

	let activeSection = '';

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				activeSection = entry.target.id;
				callback(activeSection);
			}
		});
	}, defaultOptions);

	// Observe all sections
	sectionIds.forEach((id) => {
		const element = document.getElementById(id);
		if (element) {
			observer.observe(element);
		}
	});

	return observer;
}

/**
 * Smooth scroll to a section by ID
 */
export function scrollToSection(sectionId: string, offset: number = 80): void {
	const element = document.getElementById(sectionId);
	if (!element) return;

	const elementPosition = element.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - offset;

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth'
	});
}

/**
 * Calculate scroll progress (0-100)
 */
export function getScrollProgress(): number {
	const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	return (winScroll / height) * 100;
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

/**
 * Flatten nested sections for simpler iteration
 */
export function flattenSections(sections: TocSection[]): TocSection[] {
	const result: TocSection[] = [];

	sections.forEach((section) => {
		result.push(section);
		if (section.subsections && section.subsections.length > 0) {
			result.push(...flattenSections(section.subsections));
		}
	});

	return result;
}
