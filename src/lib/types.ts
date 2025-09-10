export interface BlogPost {
	id: number;
	status: string;
	date_created: string;
	date_updated: string;
	image: string; // This will be the file ID from Directus
	title: string;
	description: string;
	content?: string;
}

export interface NewsletterForm {
	email: string;
}
