import { createDirectus, rest, readItems, updateItem } from "@directus/sdk";
import { config } from "dotenv";
config();

const DIRECTUS_URL = process.env.PUBLIC_LANDING_DIRECTUS_URL || "https://cms.cloverlabs.dev";
const client = createDirectus(DIRECTUS_URL).with(rest());

interface FAQUpdate {
	id: number;
	question: string;
	answer: string;
	important_note?: string;
	warning_note?: string;
	tip_note?: string;
	info_note?: string;
}

// Function to extract callout sections from answer text
function extractCallouts(answer: string): {
	cleanAnswer: string;
	important_note?: string;
	warning_note?: string;
	tip_note?: string;
	info_note?: string;
} {
	let cleanAnswer = answer;
	let important_note: string | undefined;
	let warning_note: string | undefined;
	let tip_note: string | undefined;
	let info_note: string | undefined;

	// Extract POMEMBNO sections (Important notes)
	const importantMatch = answer.match(/POMEMBNO:\s*\n\n([\s\S]*?)(?=\n\n[A-Z]|$)/);
	if (importantMatch) {
		const importantText = importantMatch[1].trim();
		// Split by bullet points and clean up
		const bulletPoints = importantText
			.split(/\n\n-/)
			.map((point) => point.replace(/^-\s*/, "").trim())
			.filter((point) => point.length > 0);

		important_note = bulletPoints.join("\n\n");

		// Remove the POMEMBNO section from the answer
		cleanAnswer = cleanAnswer.replace(/\n*POMEMBNO:\s*\n\n[\s\S]*$/m, "").trim();
	}

	return {
		cleanAnswer,
		important_note,
		warning_note,
		tip_note,
		info_note,
	};
}

async function updateFAQCallouts() {
	try {
		console.log("Fetching all FAQs...\n");

		// Fetch all FAQs
		const faqs = await client.request(
			readItems("kgb_faq", {
				fields: ["id", "question", "answer"],
				filter: {
					status: { _eq: "published" },
				},
			})
		);

		console.log(`Found ${faqs.length} FAQs to process\n`);

		let updatedCount = 0;

		for (const faq of faqs as any[]) {
			const { cleanAnswer, important_note, warning_note, tip_note, info_note } =
				extractCallouts(faq.answer);

			// Only update if we found callouts
			if (important_note || warning_note || tip_note || info_note) {
				console.log(`\n📝 Updating FAQ ID ${faq.id}: ${faq.question.substring(0, 50)}...`);

				if (important_note) {
					console.log(`  ⚠️  Found important note (${important_note.length} chars)`);
				}
				if (warning_note) {
					console.log(`  ⚡ Found warning note (${warning_note.length} chars)`);
				}
				if (tip_note) {
					console.log(`  💡 Found tip note (${tip_note.length} chars)`);
				}
				if (info_note) {
					console.log(`  ℹ️  Found info note (${info_note.length} chars)`);
				}

				try {
					await client.request(
						updateItem("kgb_faq", faq.id, {
							answer: cleanAnswer,
							important_note: important_note || null,
							warning_note: warning_note || null,
							tip_note: tip_note || null,
							info_note: info_note || null,
						})
					);

					console.log(`  ✓ Updated successfully`);
					updatedCount++;
				} catch (error: any) {
					console.error(`  ✗ Error updating FAQ ${faq.id}:`, error.message);
				}
			} else {
				console.log(`⏭️  Skipping FAQ ID ${faq.id} (no callouts found)`);
			}
		}

		console.log(`\n\n✓ Update completed! Updated ${updatedCount} FAQs with callouts.`);
	} catch (error) {
		console.error("Error during update:", error);
		process.exit(1);
	}
}

// Run the update
updateFAQCallouts();
