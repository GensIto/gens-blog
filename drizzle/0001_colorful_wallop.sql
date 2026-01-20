ALTER TABLE `admin` ADD `createdAt` text DEFAULT (datetime('now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `admin` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `blogs` ADD `createdAt` text DEFAULT (datetime('now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `blogs` ADD `updatedAt` text DEFAULT (datetime('now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `blogs` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `blogs` DROP COLUMN `updated_at`;--> statement-breakpoint
ALTER TABLE `tags` ADD `createdAt` text DEFAULT (datetime('now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `tags` ADD `updatedAt` text DEFAULT (datetime('now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `tags` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `tags` DROP COLUMN `updated_at`;