import { relations, sql } from "drizzle-orm";
import {
  decimal,
  index,
  int,
  mediumint,
  primaryKey,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "../_table";
import { nutrition } from "../nutrition";

export const users = mySqlTable(
  "user",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
      fsp: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
    image: varchar("image", { length: 255 }),
    // unique username
    username: varchar("username", { length: 30 }).unique(),
    // extra fields
    age: smallint("age"),
    birth_sex: varchar("birth_sex", { length: 10 }),
    height_cm: decimal("height_cm", { precision: 5, scale: 2 }),
    weight_kg: decimal("weight_kg", { precision: 5, scale: 2 }),
    activity_level: varchar("activity_level", { length: 50 }),
    energy_expenditure: mediumint("energy_expenditure"),
    allergies: text("allergies"),
    dietary_preferences: text("dietary_preferences"),
    medical_conditions: text("medical_conditions"),
    medications: text("medications"),
    nutritional_goals: text("nutritional_goals"),
    ethnicity: varchar("ethnicity", { length: 50 }),
    budget: decimal("budget", { precision: 10, scale: 2 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (user) => ({
    usernameIdx: index("username_idx").on(user.username),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  nutrition: many(nutrition),
}));

export const accounts = mySqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<"oauth" | "oidc" | "email">()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mySqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mySqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
