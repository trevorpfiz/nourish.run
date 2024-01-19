CREATE TABLE `nourish_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `nourish_account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `nourish_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `nourish_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `nourish_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	`username` varchar(30),
	`age` smallint,
	`birth_sex` varchar(10),
	`height_cm` decimal(5,2),
	`weight_kg` decimal(5,2),
	`activity_level` varchar(50),
	`energy_expenditure` mediumint,
	`allergies` text,
	`dietary_preferences` text,
	`medical_conditions` text,
	`medications` text,
	`nutritional_goals` text,
	`ethnicity` varchar(50),
	`budget` decimal(10,2),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nourish_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `nourish_user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `nourish_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `nourish_verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `nourish_food_item` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`description` text,
	`food_group` varchar(50),
	`brand` varchar(100),
	`serving_sizes` text,
	`ingredients` text,
	`type` enum('food','drink','supplement'),
	`packaging_size` varchar(100),
	`price` decimal(6,2),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nourish_food_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nourish_food_items_to_nutrients` (
	`food_item_id` varchar(191) NOT NULL,
	`nutrient_id` varchar(191) NOT NULL,
	`quantity_per_100g` decimal(10,4),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nourish_food_items_to_nutrients_food_item_id_nutrient_id_pk` PRIMARY KEY(`food_item_id`,`nutrient_id`)
);
--> statement-breakpoint
CREATE TABLE `nourish_nutrition` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`food_item_id` varchar(191) NOT NULL,
	`serving_size` varchar(100),
	`servings` decimal(8,3),
	`quality` varchar(50),
	`time` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nourish_nutrition_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nourish_nutrient` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`category` varchar(100),
	`class` varchar(100),
	`group_name` varchar(100),
	`name` varchar(100),
	`unit` varchar(20),
	`daily_value` decimal(10,4),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nourish_nutrient_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `nourish_account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `nourish_session` (`userId`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `nourish_user` (`username`);