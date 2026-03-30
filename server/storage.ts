import { db } from "./db";
import { 
  legends, type InsertLegend, type Legend,
  memories, type InsertMemory, type Memory,
  timelineEvents, type InsertTimelineEvent, type TimelineEvent,
  musicTracks, type InsertMusicTrack, type MusicTrack,
  quizSubmissions, type InsertQuizSubmission, type QuizSubmission
} from "@shared/schema";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Legends
  getLegends(): Promise<Legend[]>;
  getLegend(id: number): Promise<Legend | undefined>;
  createLegend(legend: InsertLegend): Promise<Legend>;

  // Memories
  getMemories(): Promise<Memory[]>;
  createMemory(memory: InsertMemory): Promise<Memory>;

  // Timeline
  getTimelineEvents(): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;

  // Music
  getMusicTracks(): Promise<MusicTrack[]>;
  createMusicTrack(track: InsertMusicTrack): Promise<MusicTrack>;

  // Quiz
  createQuizSubmission(submission: InsertQuizSubmission): Promise<QuizSubmission>;
}

export class DatabaseStorage implements IStorage {
  // Legends
  async getLegends(): Promise<Legend[]> {
    return await db.select().from(legends).orderBy(asc(legends.id));
  }
  async getLegend(id: number): Promise<Legend | undefined> {
    const [legend] = await db.select().from(legends).where(eq(legends.id, id));
    return legend;
  }
  async createLegend(insertLegend: InsertLegend): Promise<Legend> {
    const [legend] = await db.insert(legends).values(insertLegend).returning();
    return legend;
  }

  // Memories
  async getMemories(): Promise<Memory[]> {
    return await db.select().from(memories).orderBy(desc(memories.date));
  }
  async createMemory(insertMemory: InsertMemory): Promise<Memory> {
    const [memory] = await db.insert(memories).values(insertMemory).returning();
    return memory;
  }

  // Timeline
  async getTimelineEvents(): Promise<TimelineEvent[]> {
    return await db.select().from(timelineEvents).orderBy(asc(timelineEvents.year), asc(timelineEvents.order));
  }
  async createTimelineEvent(insertEvent: InsertTimelineEvent): Promise<TimelineEvent> {
    const [event] = await db.insert(timelineEvents).values(insertEvent).returning();
    return event;
  }

  // Music
  async getMusicTracks(): Promise<MusicTrack[]> {
    return await db.select().from(musicTracks).orderBy(asc(musicTracks.id));
  }
  async createMusicTrack(insertTrack: InsertMusicTrack): Promise<MusicTrack> {
    const [track] = await db.insert(musicTracks).values(insertTrack).returning();
    return track;
  }

  // Quiz
  async createQuizSubmission(insertSubmission: InsertQuizSubmission): Promise<QuizSubmission> {
    const [submission] = await db.insert(quizSubmissions).values(insertSubmission).returning();
    return submission;
  }
}

export const storage = new DatabaseStorage();
