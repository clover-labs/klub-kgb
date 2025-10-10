import type { BlogPost } from '$lib/types';

/**
 * Generates a URL-friendly slug from a title
 * Converts to lowercase, replaces spaces with hyphens, removes special characters
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		// Replace slovenian characters
		.replace(/č/g, 'c')
		.replace(/š/g, 's')
		.replace(/ž/g, 'z')
		// Remove all non-alphanumeric characters except hyphens and spaces
		.replace(/[^a-z0-9\s-]/g, '')
		// Replace spaces with hyphens
		.replace(/\s+/g, '-')
		// Replace multiple consecutive hyphens with single hyphen
		.replace(/-+/g, '-')
		// Remove leading/trailing hyphens
		.replace(/^-+|-+$/g, '');
}

/**
 * Generates a month abbreviation in Slovenian from a date
 * Returns lowercase 3-letter month code
 */
export function getMonthSlug(date: Date): string {
	const months = [
		'jan', 'feb', 'mar', 'apr', 'maj', 'jun',
		'jul', 'avg', 'sep', 'okt', 'nov', 'dec'
	];
	return months[date.getMonth()];
}

/**
 * Gets the full month name in Slovenian from a month slug
 */
export function getMonthName(monthSlug: string): string {
	const monthNames: Record<string, string> = {
		'jan': 'Januar',
		'feb': 'Februar',
		'mar': 'Marec',
		'apr': 'April',
		'maj': 'Maj',
		'jun': 'Junij',
		'jul': 'Julij',
		'avg': 'Avgust',
		'sep': 'September',
		'okt': 'Oktober',
		'nov': 'November',
		'dec': 'December'
	};
	return monthNames[monthSlug] || monthSlug;
}

/**
 * Generates the full event URL path: /events/year/month/slug
 */
export function generateEventUrl(event: BlogPost): string {
	const eventDate = new Date(event.event_date);
	const year = eventDate.getFullYear();
	const month = getMonthSlug(eventDate);
	const slug = event.slug || generateSlug(event.title);

	return `/events/${year}/${month}/${slug}`;
}

/**
 * Parses an event URL and returns the year, month, and slug
 */
export function parseEventUrl(url: string): { year: number; month: string; slug: string } | null {
	const match = url.match(/\/events\/(\d{4})\/([a-z]{3})\/([a-z0-9-]+)/);
	if (!match) return null;

	return {
		year: parseInt(match[1]),
		month: match[2],
		slug: match[3]
	};
}

/**
 * Checks if an event is in the past
 */
export function isPastEvent(eventDate: string): boolean {
	return new Date(eventDate) < new Date();
}

/**
 * Checks if an event is upcoming (in the future)
 */
export function isUpcomingEvent(eventDate: string): boolean {
	return new Date(eventDate) >= new Date();
}

/**
 * Gets the number of days until an event
 * Compares dates only (ignoring time) to avoid timezone issues
 */
export function getDaysUntilEvent(eventDate: string): number {
	// Get today's date at midnight (local time)
	const now = new Date();
	now.setHours(0, 0, 0, 0);

	// Get event date at midnight (local time)
	const event = new Date(eventDate);
	event.setHours(0, 0, 0, 0);

	// Calculate difference in days
	const diff = event.getTime() - now.getTime();
	return Math.floor(diff / (1000 * 60 * 60 * 24));
}
