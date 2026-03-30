import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { fetchPulse, getFallbackPulse } from "./pulse";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Register Integration Routes
  registerChatRoutes(app);
  registerImageRoutes(app);

  // Legends
  app.get(api.legends.list.path, async (req, res) => {
    const legends = await storage.getLegends();
    res.json(legends);
  });

  app.get(api.legends.get.path, async (req, res) => {
    const legend = await storage.getLegend(Number(req.params.id));
    if (!legend) {
      return res.status(404).json({ message: 'Legend not found' });
    }
    res.json(legend);
  });

  app.post(api.legends.create.path, async (req, res) => {
    try {
      const input = api.legends.create.input.parse(req.body);
      const legend = await storage.createLegend(input);
      res.status(201).json(legend);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  // Memories
  app.get(api.memories.list.path, async (req, res) => {
    const memories = await storage.getMemories();
    res.json(memories);
  });

  app.post(api.memories.create.path, async (req, res) => {
    try {
      const input = api.memories.create.input.parse(req.body);
      const memory = await storage.createMemory(input);
      res.status(201).json(memory);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  // Timeline
  app.get(api.timeline.list.path, async (req, res) => {
    const events = await storage.getTimelineEvents();
    res.json(events);
  });

  app.post(api.timeline.create.path, async (req, res) => {
    try {
      const input = api.timeline.create.input.parse(req.body);
      const event = await storage.createTimelineEvent(input);
      res.status(201).json(event);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  // Music
  app.get(api.music.list.path, async (req, res) => {
    const tracks = await storage.getMusicTracks();
    res.json(tracks);
  });

  app.post(api.music.create.path, async (req, res) => {
    try {
      const input = api.music.create.input.parse(req.body);
      const track = await storage.createMusicTrack(input);
      res.status(201).json(track);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  // Quiz Submission
  app.post(api.quiz.submit.path, async (req, res) => {
    try {
      const input = api.quiz.submit.input.parse(req.body);
      const submission = await storage.createQuizSubmission(input);
      res.status(201).json({ message: "Question submitted for review!", id: submission.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  // BHU × Banaras Pulse
  app.get("/api/pulse", async (req, res) => {
    try {
      const pulse = await fetchPulse();
      res.json(pulse);
    } catch (error) {
      console.error("Pulse fetch error:", error);
      res.json(getFallbackPulse());
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const legends = await storage.getLegends();
  if (legends.length === 0) {
    await storage.createLegend({
      name: "Alex 'The Glitch'",
      nickname: "Glitch",
      bio: "Master of code and caffeine. Known for fixing bugs at 3 AM and breaking them at 4 AM.",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      traits: ["Coder", "Night Owl", "Caffeine Addict"],
      birthday: "Oct 12",
      isFounder: true
    });
    await storage.createLegend({
      name: "Sarah 'Vibes'",
      nickname: "Vibes",
      bio: "The playlist curator. If there's silence, she fills it with lo-fi beats.",
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      traits: ["DJ", "Chill", "Connector"],
      birthday: "Feb 28",
      isFounder: true
    });
    await storage.createLegend({
      name: "Mike 'Tank'",
      nickname: "Tank",
      bio: "Carries the squad in every game. Also physically carries the snacks.",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      traits: ["Gamer", "Strong", "Snack Lord"],
      birthday: "Jul 4",
      isFounder: false
    });
  }

  const events = await storage.getTimelineEvents();
  if (events.length === 0) {
    await storage.createTimelineEvent({
      year: 2018,
      title: "The Beginning",
      description: "The squad formed during the Great Hackathon of '18.",
      order: 1
    });
    await storage.createTimelineEvent({
      year: 2019,
      title: "First Roadtrip",
      description: "We drove 500 miles for a concert that got cancelled. Best trip ever.",
      order: 1
    });
    await storage.createTimelineEvent({
      year: 2021,
      title: "The Lockdown LAN Party",
      description: "48 hours of gaming. 0 hours of sleep.",
      order: 1
    });
  }

  const music = await storage.getMusicTracks();
  if (music.length === 0) {
    await storage.createMusicTrack({
      title: "Neon Dreams",
      artist: "Synthwave Collective",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "3:45"
    });
    await storage.createMusicTrack({
      title: "Midnight City Drive",
      artist: "Retro Boy",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: "4:20"
    });
  }

  const memories = await storage.getMemories();
  if (memories.length === 0) {
    await storage.createMemory({
      title: "Beach Day",
      description: "That time we forgot the sunscreen.",
      date: "Summer 2019",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      type: "photo",
      tags: ["Summer", "Beach", "Fail"]
    });
    await storage.createMemory({
      title: "Arcade Night",
      description: "Setting high scores and eating pizza.",
      date: "Fall 2020",
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      type: "photo",
      tags: ["Gaming", "Food"]
    });
  }
}
