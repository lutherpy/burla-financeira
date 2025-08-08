import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const investmentSimulation = pgTable("investment_simulation", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  bank: text("bank").notNull(),
  accountNumber: text("account_number").notNull(),
  province: text("province").notNull(),
  age: integer("age").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  profissao: text("profissao").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const provincia = pgTable("provincia", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
});

export const profissao = pgTable("profissao", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
});

export type investmentSimulation = typeof investmentSimulation.$inferSelect;
export type Provincia = typeof provincia.$inferSelect;
export type Profissao = typeof profissao.$inferSelect;
