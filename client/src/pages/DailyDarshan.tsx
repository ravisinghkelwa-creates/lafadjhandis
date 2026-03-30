import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { Button } from "@/components/ui/button";
import { 
  Quote, 
  Flame, 
  Music, 
  Gamepad2, 
  RefreshCw,
  ExternalLink,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { BanarasiHero } from "@/components/BanarasiHero";

const quotes = [
  "Bakchodi is not an art, it is a lifestyle.",
  "Attendance is temporary, Bakchodi is permanent.",
  "Chai in Banaras has more character than most people's LinkedIn profiles.",
  "Studying for exams is for those who don't believe in the power of 'Jai Mata Di'.",
  "Proxy lagana is a sacred duty towards friendship.",
  "Engineering is 10% math and 90% finding out which senior has the previous year papers.",
  "Maggi tastes better when cooked at 3 AM in a forbidden electric kettle."
];

const roasts = [
  "You are the 'attendance low' of humans. Technically present, but nobody knows why.",
  "Your confidence is like a Banarasi rikshaw—loud, shaky, and going in the wrong direction.",
  "If your brain was a hostel, it would be the one with no Wi-Fi and permanent water shortage.",
  "Looks like someone tried to download common sense but the connection timed out.",
  "You're like a 404 error - you're there, but you're not doing anything useful.",
  "Your social life is like the hostel mess menu: depressing and everyone's looking for an alternative."
];

const songs = [
  { label: "Bandey — The Local Train", url: "https://www.youtube.com/results?search_query=Bandey+The+Local+Train" },
  { label: "Chadh De Murakh Moh — Coke Studio", url: "https://www.youtube.com/results?search_query=Chadh+De+Murakh+Moh+Coke+Studio" },
  { label: "Tum Naraz Ho — Sajjad Ali", url: "https://www.youtube.com/results?search_query=Tum+Naraz+Ho+Sajjad+Ali" },
  { label: "Jogi — Swastik Band", url: "https://www.youtube.com/results?search_query=Jogi+Swastik+Band" },
  { label: "Slow It Down — Nescafé Basement", url: "https://www.youtube.com/results?search_query=Slow+It+Down+Nescafe+Basement" }
];

const games = [
  { name: "Tic Tac Toe", path: "/games/tictactoe" },
  { name: "Rock Paper Scissors", path: "/games/rps" }
];

export default function DailyDarshan() {
  const [data, setData] = useState({
    quote: "",
    roast: "",
    song: { label: "", url: "" },
    game: { name: "", path: "" }
  });

  const refresh = () => {
    setData({
      quote: quotes[Math.floor(Math.random() * quotes.length)],
      roast: roasts[Math.floor(Math.random() * roasts.length)],
      song: songs[Math.floor(Math.random() * songs.length)],
      game: games[Math.floor(Math.random() * games.length)]
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative py-8 mb-8 -mx-4 px-4 overflow-hidden">
        <BanarasiHero image="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&q=80" opacity={7} />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <PageHeader 
              title="Daily Darshan" 
              subtitle="Your daily dose of chaos, curated by the spirits of Banaras." 
            />
            <Button 
              onClick={refresh}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono gap-2 mb-6 md:mb-0"
            >
              <RefreshCw className="w-4 h-4" />
              Naya Darshan
            </Button>
          </div>
          <p className="text-center text-sm font-mono text-muted-foreground italic -mt-4">
            "Refresh maaro, naya content aayega — guaranteed bakchodi."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quote of the Day */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          key={`quote-${data.quote}`}
        >
          <RetroCard glowColor="primary" className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Quote className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest">Gyaan of the Day</span>
            </div>
            <p className="text-xl font-display italic text-glow flex-1">
              "{data.quote}"
            </p>
          </RetroCard>
        </motion.div>

        {/* Roast of the Day */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          key={`roast-${data.roast}`}
        >
          <RetroCard glowColor="secondary" className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-secondary">
              <Flame className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest">Aura Check</span>
            </div>
            <p className="text-lg font-mono text-secondary-foreground flex-1">
              {data.roast}
            </p>
          </RetroCard>
        </motion.div>

        {/* Song Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`song-${data.song.label}`}
        >
          <RetroCard glowColor="accent" className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-accent">
              <Music className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest">Hostel Jam</span>
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-lg font-display">{data.song.label}</p>
              <Button 
                asChild
                variant="outline"
                className="w-full border-accent/30 text-accent hover:bg-accent/10 font-mono text-xs"
              >
                <a href={data.song.url} target="_blank" rel="noopener noreferrer">
                  LISTEN ON YOUTUBE <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            </div>
          </RetroCard>
        </motion.div>

        {/* Game Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`game-${data.game.name}`}
        >
          <RetroCard glowColor="primary" className="p-6 h-full flex flex-col border-dashed">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Gamepad2 className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest">Time Pass</span>
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-lg font-display">Play {data.game.name}</p>
              <Link href={data.game.path}>
                <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 font-mono text-xs">
                  LAUNCH GAME <Zap className="w-3 h-3 ml-2 fill-current" />
                </Button>
              </Link>
            </div>
          </RetroCard>
        </motion.div>
      </div>

      <div className="mt-12 p-4 rounded-lg bg-card/20 border border-white/5 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
        May your chai be strong and your proxy successful.
      </div>
    </div>
  );
}
