CREATE TABLE `nourish_food_item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `food_group` varchar(50) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `serving_sizes` text,
  `ingredients` text,
  `type` enum('food','drink','supplement') DEFAULT NULL,
  `packaging_size` varchar(100) DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT (now()),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
