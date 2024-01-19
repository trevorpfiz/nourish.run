CREATE TABLE `nourish_nutrition` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(191) NOT NULL,
  `food_item_id` varchar(191) NOT NULL,
  `serving_size` varchar(100) DEFAULT NULL,
  `servings` decimal(8,3) DEFAULT NULL,
  `quality` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT (now()),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
