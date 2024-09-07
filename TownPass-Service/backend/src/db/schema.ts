import {integer, varchar, serial, decimal, pgTable} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    age: integer('age'),
    weight: decimal('weight', {precision: 5, scale: 2}),
    height: decimal('height', {precision: 5, scale: 2}),
    gender: varchar('gender', {length: 10}),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  sport: varchar('sport', {length: 50}),
  time: varchar('time', {length: 8}), // Store time as HH:MM:SS
  calories: decimal('calories', {precision: 5, scale: 2}),
  location: varchar('location', {length: 255}),
});

export const foodLog = pgTable('food_log', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  food: varchar('food', {length: 100}),
  calories: decimal('calories', {precision: 5, scale: 2}),
  time: varchar('time', {length: 8}), // Store time as HH:MM:SS
});

