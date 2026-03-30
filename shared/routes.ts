import { z } from 'zod';
import { 
  insertLegendSchema, legends,
  insertMemorySchema, memories,
  insertTimelineEventSchema, timelineEvents,
  insertMusicTrackSchema, musicTracks,
  insertQuizSubmissionSchema, quizSubmissions
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  legends: {
    list: {
      method: 'GET' as const,
      path: '/api/legends',
      responses: {
        200: z.array(z.custom<typeof legends.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/legends/:id',
      responses: {
        200: z.custom<typeof legends.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/legends',
      input: insertLegendSchema,
      responses: {
        201: z.custom<typeof legends.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  memories: {
    list: {
      method: 'GET' as const,
      path: '/api/memories',
      responses: {
        200: z.array(z.custom<typeof memories.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/memories',
      input: insertMemorySchema,
      responses: {
        201: z.custom<typeof memories.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  timeline: {
    list: {
      method: 'GET' as const,
      path: '/api/timeline',
      responses: {
        200: z.array(z.custom<typeof timelineEvents.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/timeline',
      input: insertTimelineEventSchema,
      responses: {
        201: z.custom<typeof timelineEvents.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  music: {
    list: {
      method: 'GET' as const,
      path: '/api/music',
      responses: {
        200: z.array(z.custom<typeof musicTracks.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/music',
      input: insertMusicTrackSchema,
      responses: {
        201: z.custom<typeof musicTracks.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  quiz: {
    submit: {
      method: 'POST' as const,
      path: '/api/quiz/submit',
      input: insertQuizSubmissionSchema,
      responses: {
        201: z.object({ message: z.string(), id: z.number() }),
        400: errorSchemas.validation,
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
