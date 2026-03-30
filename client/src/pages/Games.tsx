import { motion } from "framer-motion";
import { Link } from "wouter";
import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap } from "lucide-react";
import { BanarasiHero } from "@/components/BanarasiHero";

const games = [
  {
    title: "Tic Tac Toe",
    description: "2-Player Local Duel",
    href: "/games/tictactoe",
    status: "Active",
    color: "primary"
  },
  {
    title: "Rock Paper Scissors",
    description: "Beat the Computer",
    href: "/games/rps",
    status: "Active",
    color: "secondary"
  },
  {
    title: "Chess",
    description: "Grandmaster Bakchodi",
    href: "#",
    status: "Soon",
    color: "accent"
  },
  {
    title: "Ludo",
    description: "Hostel Classic",
    href: "#",
    status: "Soon",
    color: "primary"
  },
  {
    title: "Pictionary",
    description: "Dumb Charades but with pen",
    href: "#",
    status: "Soon",
    color: "secondary"
  }
];

export default function GamesHub() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative py-8 mb-8 -mx-4 px-4 overflow-hidden">
        <BanarasiHero image="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80" opacity={5} />
        <div className="relative z-10">
          <PageHeader 
            title="Games" 
            subtitle="Timepass, but competitive." 
          />
        </div>
      </div>

      {/* Featured Quiz Section - Clean */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Link href="/quiz/iitbhu">
          <RetroCard 
            glowColor="accent" 
            className="p-6 cursor-pointer hover-elevate transition-all"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Brain className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="text-xl font-display" data-testid="text-quiz-title">BHU × Banaras Insider Quiz</h3>
                  <p className="text-muted-foreground font-mono text-xs" data-testid="text-quiz-subtitle">Only insiders score full marks.</p>
                </div>
              </div>
              <Button size="default" className="bg-accent text-accent-foreground font-display" data-testid="button-play-quiz">
                <Zap className="w-4 h-4 mr-2" /> Start
              </Button>
            </div>
          </RetroCard>
        </Link>
      </motion.div>

      <h2 className="text-xl font-display text-muted-foreground mb-6">More Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, i) => (
          <Link key={game.title} href={game.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={game.status === "Soon" ? "pointer-events-none opacity-60" : "cursor-pointer"}
            >
              <RetroCard 
                glowColor={game.color as any}
                className="h-full flex flex-col justify-between hover-elevate transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-display">{game.title}</h3>
                    <Badge variant={game.status === "Active" ? "default" : "outline"}>
                      {game.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    {game.description}
                  </p>
                </div>
                {game.status === "Active" && (
                  <div className="mt-6 text-xs font-mono text-primary uppercase tracking-widest">
                    Play Now &rarr;
                  </div>
                )}
              </RetroCard>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-8 border-2 border-dashed border-muted rounded-xl text-center"
      >
        <h4 className="text-xl font-display text-muted-foreground mb-2">More Games Coming Soon</h4>
        <p className="text-sm font-mono text-muted-foreground/60">Suggest a game in the AI Chat Zone!</p>
      </motion.div>
    </div>
  );
}
