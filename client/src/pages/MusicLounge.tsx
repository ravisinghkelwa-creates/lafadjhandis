import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { Music, Headphones, Disc, Play } from "lucide-react";
import { motion } from "framer-motion";
import { BanarasiHero } from "@/components/BanarasiHero";

const songs = [
  {
    title: "Local Train",
    songLabel: "Bandey — The Local Train",
    tagline: "The soundtrack of every corridor walk.",
    searchUrl: "https://www.youtube.com/results?search_query=Bandey+The+Local+Train",
    color: "primary",
    thumbnail: "https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Coke Studio India",
    songLabel: "Chadh De Murakh Moh",
    tagline: "Early seasons, pure soul, no filters.",
    searchUrl: "https://www.youtube.com/results?search_query=Chadh+De+Murakh+Moh+Coke+Studio",
    color: "secondary",
    thumbnail: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Coke Studio Pakistan",
    songLabel: "Tum Naraz Ho — Sajjad Ali",
    tagline: "Legendary sessions that transcended borders.",
    searchUrl: "https://www.youtube.com/results?search_query=Tum+Naraz+Ho+Sajjad+Ali",
    color: "accent",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Hostel Night Playlist",
    songLabel: "Kuch Na Karein — Nabeel Shaukat",
    tagline: "Punjabi beats, Wasseypur energy, total chaos.",
    searchUrl: "https://www.youtube.com/results?search_query=Kuch+Na+Karein+Nabeel+Shaukat",
    color: "primary",
    thumbnail: "https://images.unsplash.com/photo-1459749411177-042180ce6742?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Nescafé Basement",
    songLabel: "Slow It Down — Nescafé Basement",
    tagline: "Raw talent, hostel room vibes.",
    searchUrl: "https://www.youtube.com/results?search_query=Slow+It+Down+Nescafe+Basement",
    color: "secondary",
    thumbnail: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Swastik Band",
    songLabel: "Jogi — Swastik Band",
    tagline: "Banaras to the world.",
    searchUrl: "https://www.youtube.com/results?search_query=Jogi+Swastik+Band",
    color: "accent",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
  }
];

const colorStyles: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary" },
  accent: { bg: "bg-accent/10", text: "text-accent" },
};

export default function MusicLounge() {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative py-8 mb-8 -mx-4 px-4 overflow-hidden">
        <BanarasiHero image="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80" opacity={6} />
        <div className="relative z-10">
          <PageHeader 
            title="Music Lounge" 
            subtitle="Gaane jo repeat pe chale." 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {songs.map((song, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="cursor-pointer"
            onClick={() => openLink(song.searchUrl)}
          >
            <RetroCard 
              glowColor={song.color as any}
              className="p-6 h-full flex flex-col gap-4 bg-card/50 backdrop-blur-sm border-primary/10 group transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${colorStyles[song.color]?.bg} ${colorStyles[song.color]?.text}`}>
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display">{song.title}</h3>
                    <p className="text-xs font-mono text-muted-foreground italic">{song.tagline}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-full ${colorStyles[song.color]?.bg} ${colorStyles[song.color]?.text}`}>
                  <Music className="w-5 h-5" />
                </div>
              </div>

              <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-white/5 shadow-2xl">
                <img 
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:scale-110 active:scale-95">
                    <Play className="w-8 h-8 ml-1 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 text-[10px] font-mono bg-black/60 px-2 py-1 rounded border border-white/10">
                  Open in YouTube
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <span className="text-lg font-bold font-display tracking-tight text-glow">{song.songLabel}</span>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground/30">
                <span>Vibe: Late Night Hostel</span>
                <Disc className="w-3 h-3 animate-spin-slow" />
              </div>
            </RetroCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground/50 text-xs font-mono">
          More tracks coming.
        </p>
      </motion.div>
    </div>
  );
}
