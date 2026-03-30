import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Export chat models from integration
export * from "./models/chat";

// Legends (Friends/Characters)
export const legends = pgTable("legends", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nickname: text("nickname"),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  traits: text("traits").array(), // Array of strings for personality traits
  birthday: text("birthday"), // Text for flexibility "May 5th"
  isFounder: boolean("is_founder").default(false),
});

export const insertLegendSchema = createInsertSchema(legends).omit({ id: true });
export type Legend = typeof legends.$inferSelect;
export type InsertLegend = z.infer<typeof insertLegendSchema>;

// Memories (Gallery)
export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: text("date"), // "Summer 2012"
  imageUrl: text("image_url").notNull(),
  type: text("type").notNull().default("photo"), // photo, video
  tags: text("tags").array(),
});

export const insertMemorySchema = createInsertSchema(memories).omit({ id: true });
export type Memory = typeof memories.$inferSelect;
export type InsertMemory = z.infer<typeof insertMemorySchema>;

// Timeline Events
export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(), // For sorting within same year
});

export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({ id: true });
export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;

// Music Tracks
export const musicTracks = pgTable("music_tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  url: text("url").notNull(), // MP3 or stream URL
  duration: text("duration"),
  coverUrl: text("cover_url"),
});

export const insertMusicTrackSchema = createInsertSchema(musicTracks).omit({ id: true });
export type MusicTrack = typeof musicTracks.$inferSelect;
export type InsertMusicTrack = z.infer<typeof insertMusicTrackSchema>;

// Quiz Submissions (User-submitted questions)
export const quizSubmissions = pgTable("quiz_submissions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  correctAnswer: text("correct_answer").notNull(), // "A", "B", "C", or "D"
  difficulty: text("difficulty").notNull().default("Core"), // Easy, Core, Hardcore, Nuclear
  submittedBy: text("submitted_by"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuizSubmissionSchema = createInsertSchema(quizSubmissions).omit({ id: true, createdAt: true, status: true });
export type QuizSubmission = typeof quizSubmissions.$inferSelect;
export type InsertQuizSubmission = z.infer<typeof insertQuizSubmissionSchema>;
