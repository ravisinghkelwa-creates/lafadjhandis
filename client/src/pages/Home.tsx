import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { RetroCard } from "@/components/RetroCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Radio, ArrowRight, Gamepad2, Music, Users, ImageIcon } from "lucide-react";
import { BanarasiHero } from "@/components/BanarasiHero";

interface PulseItem {
  id: string;
  headline: string;
  summary: string;
  tag: "Campus" | "Alumni" | "Banaras" | "Culture";
  source: string;
  url: string;
  date: string;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Clean & Cinematic */}
      <section className="relative py-28 md:py-40 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <BanarasiHero opacity={8} intense={true} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-display leading-tight text-glow">
            Lafadjhandis
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-mono">
            A joint effort, you could say. 🍃
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground font-display px-6 hover-elevate">
              <Link href="/legends" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Explore Legends
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-display px-6 hover-elevate">
              <Link href="/games" className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" /> Play Games
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-display px-6 hover-elevate">
              <Link href="/music" className="flex items-center gap-2">
                <Music className="w-4 h-4" /> Music Lounge
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-display px-6 hover-elevate">
              <Link href="/quiz/iitbhu" className="flex items-center gap-2">
                <Brain className="w-4 h-4" /> Take the Quiz
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Origin Section - Short & Witty */}
      <section className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-display text-accent">How this started</h2>
          <p className="text-muted-foreground font-mono text-sm leading-relaxed">
            Started in IIT BHU.<br />
            Powered by chai, deadlines, and bad decisions.<br />
            Still going strong.
          </p>
        </motion.div>
      </section>

      {/* Featured Quiz Section - Clean Card */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/quiz/iitbhu">
            <RetroCard 
              glowColor="accent" 
              className="p-6 md:p-10 cursor-pointer hover-elevate transition-all"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-xl md:text-3xl font-display mb-2" data-testid="text-quiz-home-title">
                    BHU × Banaras Insider Quiz
                  </h2>
                  <p className="text-muted-foreground font-mono text-sm" data-testid="text-quiz-home-tagline">
                    Only insiders score full marks.
                  </p>
                </div>
                <Button size="lg" className="bg-accent text-accent-foreground font-display px-6" data-testid="button-start-quiz-home">
                  <Zap className="w-4 h-4 mr-2" /> Start Quiz
                </Button>
              </div>
            </RetroCard>
          </Link>
        </motion.div>
      </section>

      {/* Pulse Preview */}
      <PulsePreview />

      {/* Quick Links Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/music">
              <RetroCard className="p-6 text-center hover-elevate cursor-pointer h-full">
                <Music className="w-6 h-6 mx-auto mb-3 text-accent" />
                <h3 className="font-display text-lg mb-1">Music Lounge</h3>
                <p className="text-muted-foreground text-xs font-mono">Gaane jo repeat pe chale.</p>
              </RetroCard>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/games">
              <RetroCard className="p-6 text-center hover-elevate cursor-pointer h-full">
                <Gamepad2 className="w-6 h-6 mx-auto mb-3 text-secondary" />
                <h3 className="font-display text-lg mb-1">Games</h3>
                <p className="text-muted-foreground text-xs font-mono">Timepass, but competitive.</p>
              </RetroCard>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/ai">
              <RetroCard className="p-6 text-center hover-elevate cursor-pointer h-full">
                <Brain className="w-6 h-6 mx-auto mb-3 text-primary" />
                <h3 className="font-display text-lg mb-1">AI Playground</h3>
                <p className="text-muted-foreground text-xs font-mono">Mostly useful. Sometimes savage.</p>
              </RetroCard>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 text-center">
        <p className="text-muted-foreground/50 font-mono text-xs tracking-wider">
          Built for insiders.
        </p>
        <p className="text-muted-foreground/30 font-mono text-[10px] mt-2 tracking-widest uppercase">
          Since 2012
        </p>
      </footer>
    </div>
  );
}

function PulsePreview() {
  const { data: pulseItems, isLoading } = useQuery<PulseItem[]>({
    queryKey: ["/api/pulse"],
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const tagColors: Record<string, string> = {
    Campus: "bg-primary/10 text-primary border-primary/20",
    Alumni: "bg-accent/10 text-accent border-accent/20",
    Banaras: "bg-secondary/10 text-secondary border-secondary/20",
    Culture: "bg-muted text-muted-foreground border-muted",
  };

  if (isLoading || !pulseItems || pulseItems.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-secondary" />
            <h2 className="text-lg font-display">BHU × Banaras Pulse</h2>
          </div>
          <Link href="/pulse">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs" data-testid="link-view-all-pulse">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="space-y-2">
          {pulseItems.slice(0, 2).map((item, index) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block p-3 rounded-md border border-border/30 bg-card/30 hover-elevate transition-all"
              data-testid={`link-pulse-item-${index}`}
            >
              <div className="flex items-start gap-3">
                <Badge variant="outline" className={`${tagColors[item.tag]} text-[10px] shrink-0`}>
                  {item.tag}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/90 truncate">{item.headline}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
