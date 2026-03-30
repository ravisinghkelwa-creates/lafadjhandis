import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, MessageSquareQuote, GraduationCap, UserSearch, Wand2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { BanarasiHero } from "@/components/BanarasiHero";

type RoastLevel = "Soft" | "Savage" | "Nuclear";

export default function AiZone() {
  const [roastName, setRoastName] = useState("");
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("Soft");
  const [roastResult, setRoastResult] = useState("");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [result, setResult] = useState("");

  const roasts: Record<RoastLevel, string[]> = {
    Soft: [
      "Your jokes are like a library—quiet and only appreciated by people over 60.",
      "You're the human version of a participation trophy.",
      "If you were a spice, you'd be flour.",
      "You have the charisma of a slightly damp sponge."
    ],
    Savage: [
      "You are the 'attendance low' of humans. Technically present, but nobody knows why.",
      "Your confidence is like a Banarasi rikshaw—loud, shaky, and going in the wrong direction.",
      "If your brain was a hostel, it would be the one with no Wi-Fi and permanent water shortage.",
      "Looks like someone tried to download common sense but the connection timed out."
    ],
    Nuclear: [
      "I’d explain it to you, but I left my crayons at home.",
      "You’re the reason the gene pool needs a lifeguard.",
      "Somewhere out there, a tree is working very hard to produce oxygen for you. You should go apologize to it.",
      "Your birth certificate is an apology letter from the condom factory."
    ]
  };

  const quotes = [
    "Bakchodi is not an art, it is a lifestyle.",
    "Attendance is temporary, Bakchodi is permanent.",
    "Chai in Banaras has more character than most people's LinkedIn profiles.",
    "Studying for exams is for those who don't believe in the power of 'Jai Mata Di'."
  ];

  const stories = [
    "So there I was, in the proxy lab, hacking the mess menu to include extra paneer. I got caught not because of the code, but because I started singing 'Rinkiya Ke Papa' too loudly.",
    "I once convinced a professor that my missing assignment was actually an NFT stored in the metaverse. He didn't understand, but he gave me a B+ out of fear.",
    "The legendary night we turned the Rajpootana Hostel roof into a temporary drive-in cinema using a white bedsheet and a stolen projector. Total legend stuff."
  ];

  const types = [
    "The Silent Legend: Does all the bakchodi but never gets caught.",
    "The Proxy King: Hasn't seen the inside of a classroom since 2018.",
    "The Chai Philosopher: Knows the meaning of life, but only after 4 cups of tea.",
    "The Last Minute Warrior: Finishes the syllabus, the project, and a meal 10 minutes before the deadline."
  ];

  const handleRoast = () => {
    if (!roastName) return;
    const levelRoasts = roasts[roastLevel];
    const randomRoast = levelRoasts[Math.floor(Math.random() * levelRoasts.length)];
    setRoastResult(`${roastName}, ${randomRoast}`);
    setActiveFeature('roast');
  };

  const generateFeature = (type: string, data: string[]) => {
    const random = data[Math.floor(Math.random() * data.length)];
    setResult(random);
    setActiveFeature(type);
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative py-8 mb-8 -mx-4 px-4 overflow-hidden">
        <BanarasiHero image="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&q=80" opacity={5} />
        <div className="relative z-10">
          <PageHeader 
            title="AI Playground" 
            subtitle="Mostly useful. Sometimes savage." 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Roast Your Friend Tool */}
        <RetroCard glowColor="primary" className="p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="text-primary w-6 h-6" />
            <h3 className="text-xl font-display uppercase tracking-wider">Roast Your Friend</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Victim's Name</label>
              <Input 
                placeholder="Enter name..." 
                value={roastName}
                onChange={(e) => setRoastName(e.target.value)}
                className="bg-background/50 border-primary/20 font-mono"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Roast Level</label>
              <div className="flex gap-2">
                {(["Soft", "Savage", "Nuclear"] as RoastLevel[]).map((level) => (
                  <Button
                    key={level}
                    variant="outline"
                    size="sm"
                    onClick={() => setRoastLevel(level)}
                    className={cn(
                      "flex-1 font-mono text-[10px] uppercase tracking-tighter",
                      roastLevel === level ? "bg-primary/20 border-primary text-primary" : "border-white/10"
                    )}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-end">
              <Button onClick={handleRoast} className="w-full bg-primary text-primary-foreground font-mono">
                <Sparkles className="w-4 h-4 mr-2" /> GENERATE ROAST
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {activeFeature === 'roast' && roastResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono italic text-lg text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                "{roastResult}"
              </motion.div>
            )}
          </AnimatePresence>
        </RetroCard>

        {/* Bakchodi Quote */}
        <RetroCard glowColor="secondary" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquareQuote className="text-secondary w-6 h-6" />
            <h3 className="text-xl font-display uppercase tracking-wider">Bakchodi Quote</h3>
          </div>
          <Button 
            variant="outline" 
            onClick={() => generateFeature('quote', quotes)}
            className="w-full border-secondary/40 text-secondary"
          >
            <Wand2 className="w-4 h-4 mr-2" /> Generate One-liner
          </Button>
          <AnimatePresence>
            {activeFeature === 'quote' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary font-mono italic text-sm"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
        </RetroCard>

        {/* Fake IIT Story */}
        <RetroCard glowColor="accent" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="text-accent w-6 h-6" />
            <h3 className="text-xl font-display uppercase tracking-wider">Fake IIT Story</h3>
          </div>
          <Button 
            variant="outline" 
            onClick={() => generateFeature('story', stories)}
            className="w-full border-accent/40 text-accent"
          >
            <Wand2 className="w-4 h-4 mr-2" /> Tell me a Legend
          </Button>
          <AnimatePresence>
            {activeFeature === 'story' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20 text-accent font-mono text-sm leading-relaxed"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
        </RetroCard>

        {/* What Kind of Lafadjhandi */}
        <RetroCard glowColor="primary" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserSearch className="text-primary w-6 h-6" />
            <h3 className="text-xl font-display uppercase tracking-wider">Your Vibe?</h3>
          </div>
          <Button 
            variant="outline" 
            onClick={() => generateFeature('type', types)}
            className="w-full border-primary/40 text-primary"
          >
            <Wand2 className="w-4 h-4 mr-2" /> Analyze Me
          </Button>
          <AnimatePresence>
            {activeFeature === 'type' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-sm"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
        </RetroCard>
      </div>

      <div className="mt-16 text-center opacity-30 font-mono text-[10px] uppercase tracking-[0.2em]">
        Model trained on pure hostel chaos
      </div>
    </div>
  );
}
