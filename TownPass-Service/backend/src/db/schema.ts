import { primaryKey } from "drizzle-orm/mysql-core";
import { serial, text, timestamp, integer, pgTable, boolean } from "drizzle-orm/pg-core";

export const monster = pgTable("monster", {
  id: serial("id").primaryKey(),
  name: text("name"),
  health: integer("health"),
  ugly: boolean("ugly"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});