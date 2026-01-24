ALTER TABLE `blogs` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `blogs` ADD `excerpt` text;--> statement-breakpoint
ALTER TABLE `blogs` ADD `status` text DEFAULT 'draft' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
ALTER TABLE `blogs` DROP COLUMN `published`;
