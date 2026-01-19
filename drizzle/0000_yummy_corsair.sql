CREATE TABLE `admin` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_email_unique` ON `admin` (`email`);--> statement-breakpoint
CREATE TABLE `blog_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blog_id` integer,
	`tag_id` integer,
	FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);