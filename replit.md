# lafadjhandis

## Overview

A nostalgic digital sanctuary web application for preserving memories, stories, and shared experiences among a group of friends. The app features a dark retro-futuristic theme with neon accents, providing spaces for friend profiles ("Legends"), photo galleries ("Memory Vault"), timeline of events, music lounge, games arcade, and an AI chat zone. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and effects
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks for data fetching
    lib/          # Utilities (queryClient, supabaseClient)
server/           # Backend Express application
  routes.ts       # API route definitions
  storage.ts      # Database access layer
  db.ts           # Database connection
  replit_integrations/  # AI feature modules (chat, image, audio)
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle database schema definitions
  routes.ts       # API route contracts with Zod schemas
  models/         # Additional model definitions
```

### Data Models
- **Legends**: Friend profiles with name, bio, image, traits, birthday
- **Memories**: Photo/video gallery items with titles, dates, tags
- **Timeline Events**: Historical events organized by year
- **Music Tracks**: Playlist items with title, artist, cover art
- **Conversations/Messages**: AI chat history storage

### AI Integrations
Located in `server/replit_integrations/`:
- **Chat**: OpenAI-powered conversational AI with conversation persistence
- **Image**: Image generation using gpt-image-1 model
- **Audio**: Voice chat with speech-to-text and text-to-speech capabilities
- **Batch**: Utility for rate-limited batch processing of AI requests

### Key Design Patterns
- Type-safe API contracts shared between frontend and backend via `shared/routes.ts`
- Zod schemas for runtime validation on both client and server
- Database storage abstraction through interface pattern in `storage.ts`
- Custom hooks pattern for data fetching (`use-legends.ts`, `use-memories.ts`, etc.)

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and query building
- **Supabase**: Client-side database access for some features (legends, memories pages)

### AI Services
- **OpenAI API**: Accessed through Replit AI Integrations
  - Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`
  - Used for chat completions, image generation, speech processing

### Frontend Libraries
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI primitives for shadcn components
- **framer-motion**: Animation library
- **wouter**: Client-side routing
- **react-hook-form** + **@hookform/resolvers**: Form handling with Zod validation

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **tailwind-merge** + **clsx**: Class name utilities

### Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development