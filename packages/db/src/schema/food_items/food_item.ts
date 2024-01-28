import { relations } from "drizzle-orm";
import {
  bigint,
  decimal,
  index,
  primaryKey,
  serial,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

import { nutrient, nutrition } from "..";
import { mySqlTable } from "../_table";

export const foodItem = mySqlTable(
  "food_item",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    food_category: varchar("food_category", { length: 50 }),
    serving_sizes: text("serving_sizes"),
    calories_per_100g: decimal("calories_per_100g", {
      precision: 10,
      scale: 4,
    }),
    icon_color: tinyint("icon_color"), // FIXME: You're about to change icon_color column type from tinyint to tinyint unsigned
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (foodItem) => ({
    nameIdx: index("name_idx").on(foodItem.name),
  }),
);

export const foodItemsRelations = relations(foodItem, ({ many }) => ({
  nutrition: many(nutrition),
  foodItemsToNutrients: many(foodItemsToNutrients),
}));

export const foodItemsToNutrients = mySqlTable(
  "food_items_to_nutrients",
  {
    food_item_id: bigint("food_item_id", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    nutrient_id: bigint("nutrient_id", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    quantity_per_100g: decimal("quantity_per_100g", {
      precision: 10,
      scale: 4,
    }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.food_item_id, t.nutrient_id],
    }),
  }),
);

export const foodItemsToNutrientsRelations = relations(
  foodItemsToNutrients,
  ({ one }) => ({
    foodItem: one(foodItem, {
      fields: [foodItemsToNutrients.food_item_id],
      references: [foodItem.id],
    }),
    nutrient: one(nutrient, {
      fields: [foodItemsToNutrients.nutrient_id],
      references: [nutrient.id],
    }),
  }),
);
