import { createDirectus, rest, createItems } from "@directus/sdk";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

// Load environment variables from .env file
import { config } from "dotenv";
config();

const DIRECTUS_URL = process.env.PUBLIC_LANDING_DIRECTUS_URL || process.env.PUBLIC_DIRECTUS_URL || "https://cms.cloverlabs.dev";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || process.env.DIRECTUS_ADMIN_TOKEN;

// Create Directus client
const client = createDirectus(DIRECTUS_URL).with(rest());

console.log(`Using Directus URL: ${DIRECTUS_URL}`);

// Category mapping from CSV to Directus format
const categoryMap: Record<string, "dogodki" | "sedezi-mize" | "nastopi-najem"> = {
	"Dogodki": "dogodki",
	"Sedeži mize in rezervacije": "sedezi-mize",
	"Nastopi in najem prostora": "nastopi-najem",
};

// Function to create a slug from a question
function createSlug(question: string): string {
	return question
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Remove diacritics
		.replace(/[^a-z0-9\s-]/g, "") // Remove special characters
		.trim()
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.substring(0, 100); // Limit length
}

async function importFAQs() {
	try {
		// Read the cleaner CSV file
		const csvPath = "/Users/ME/Desktop/ExportBlock-6b7ecd02-2023-4292-827b-1a1a269b7b35-Part-1/MKT-Website 14bca32db62280aa8534ed2683db55d2.csv";
		const fileContent = readFileSync(csvPath, "utf-8");

		// Parse CSV
		const records = parse(fileContent, {
			columns: true,
			skip_empty_lines: true,
			bom: true, // Handle BOM character
		});

		console.log(`Found ${records.length} records in CSV`);

		// Filter only FAQ records and prepare for Directus
		const faqRecords = records
			.filter((record: any) => record.Question && record.Answer)
			.map((record: any, index: number) => {
				const category = categoryMap[record.Category] || "dogodki";
				const slug = createSlug(record.Question);

				return {
					question: record.Question.trim(),
					answer: record.Answer.trim(),
					category: category,
					slug: slug,
					status: "published",
					sort: index + 1, // Use index for sorting
				};
			});

		console.log(`Prepared ${faqRecords.length} FAQ records for import`);

		// Upload to Directus
		for (let i = 0; i < faqRecords.length; i++) {
			const faq = faqRecords[i];
			try {
				console.log(`Uploading ${i + 1}/${faqRecords.length}: ${faq.question.substring(0, 50)}...`);

				await client.request(
					createItems("kgb_faq", faq)
				);

				console.log(`✓ Uploaded: ${faq.question.substring(0, 50)}...`);
			} catch (error: any) {
				console.error(`✗ Error uploading FAQ "${faq.question}":`, error.message);
			}
		}

		console.log("\n✓ Import completed!");
	} catch (error) {
		console.error("Error during import:", error);
		process.exit(1);
	}
}

// Run the import
importFAQs();
