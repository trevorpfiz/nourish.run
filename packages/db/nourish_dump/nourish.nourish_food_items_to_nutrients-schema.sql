CREATE TABLE `nourish_food_items_to_nutrients` (
  `food_item_id` varchar(191) NOT NULL,
  `nutrient_id` varchar(191) NOT NULL,
  `quantity_per_100g` decimal(10,4) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT (now()),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`food_item_id`,`nutrient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
