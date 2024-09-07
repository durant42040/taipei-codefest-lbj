import {integer, varchar, serial, decimal, pgTable} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: varchar('id', {length: 200}).primaryKey(),
    name: varchar('name', {length: 50}),
    age: integer('age'),
    weight: decimal('weight', {precision: 5, scale: 2}),
    height: decimal('height', {precision: 5, scale: 2}),
    gender: varchar('gender', {length: 10}),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  sport: varchar('sport', {length: 50}),
  time: varchar('time', {length: 8}), // Store time as HH:MM:SS
  duration: varchar('duration', {length: 8}), // Store duration
  calories: decimal('calories', {precision: 5}),
  location: varchar('location', {length: 255}),
});

export const weights = pgTable('weights', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id').references(() => users.id), // Foreign key to users table
    weight: decimal('weight', {precision: 5, scale: 2}), // User's weight (e.g., 75.50 kg)
    time: varchar('time', {length: 8}), // Store time as HH:MM:SS or timestamp
});

export const foodLog = pgTable('food_log', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  food: varchar('food', {length: 100}),
  calories: decimal('calories', {precision: 5, scale: 2}),
  time: varchar('time', {length: 8}), // Store time as HH:MM:SS
});

