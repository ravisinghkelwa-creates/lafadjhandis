import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { Skull, Ghost, Zap, AlertTriangle, Coffee, MessageCircle } from "lucide-react";

const confessions = [
  {
    title: "The Proxy Masterclass",
    content: "I once attended a whole semester as three different people. The professor even gave 'all of us' a group project. I finished it alone and got three A's. My real identity is still a mystery in that department.",
    tag: "IIT Confession"
  },
  {
    title: "Mess Menu Hack",
    content: "We discovered that the biometric scanner for the mess also responds to a high-resolution printout of a potato. For one glorious week, the entire hostel ate for free. The warden thought we were just very disciplined about our vegetable intake.",
    tag: "Legendary"
  },
  {
    title: "The Library Ghost",
    content: "There's no ghost in the North Wing library. It was just me with a portable speaker and a white bedsheet trying to keep people away so I could sleep in peace during finals week.",
    tag: "Absurd"
  },
  {
    title: "Rinkiya Ke Papa Remix",
    content: "The reason the college radio station went offline in 2019? I accidentally looped a 10-hour bass-boosted version of Rinkiya Ke Papa through the main server. The admin still thinks it was a sophisticated cyber-attack from a rival college.",
    tag: "Chaos"
  }
];

const jokes = [
  "Why did the engineering student cross the road? To see if the other side had better Wi-Fi and fewer assignments.",
  "Placement cell is like a blind date organized by your parents: High expectations, low compatibility, and you just want it to be over.",
  "My CGPA is like a ghost: People say it exists, but I haven't seen it in years.",
  "Banaras traffic is the only place where 'shortcut' means taking a 5km detour through three narrow alleys and a cow's living room."
];

export default function Bakchodi() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        
        <PageHeader 
          title="The Bakchodi Vault" 
          subtitle="WARNING: HIGH LEVELS OF ABSURDITY DETECTED. ENTER AT YOUR OWN RISK." 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Confessions Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Skull className="text-primary animate-bounce" />
            <h2 className="text-2xl font-display uppercase tracking-tighter">IIT Confessions (Allegedly)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {confessions.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <RetroCard glowColor={i % 2 === 0 ? "primary" : "secondary"} className="p-6 h-full border-dashed group hover:border-solid transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-muted-foreground uppercase">{c.tag}</span>
                    <Ghost className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-display mb-3 text-glow">{c.title}</h3>
                  <p className="text-sm font-mono leading-relaxed opacity-80">{c.content}</p>
                </RetroCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chaos Sidebar */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-accent animate-pulse" />
            <h2 className="text-2xl font-display uppercase tracking-tighter">Absurd Logic</h2>
          </div>
          
          <div className="space-y-4">
            {jokes.map((j, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                <div className="p-4 rounded bg-accent/5 border-l-2 border-accent hover:bg-accent/10 transition-colors cursor-help">
                  <p className="text-sm font-mono italic">"{j}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          <RetroCard glowColor="accent" className="p-6 bg-black/40 border-double border-4">
            <div className="flex items-center gap-2 mb-4 text-red-500">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="font-display text-sm tracking-widest">Warden's Notice</span>
            </div>
            <p className="text-xs font-mono uppercase leading-loose text-muted-foreground">
              By reading this page, you agree to:
              <br />1. Never tell the admin
              <br />2. Share your Maggi
              <br />3. Master the art of the 4 AM proxy
              <br />4. Accept that everything here is probably a lie.
            </p>
          </RetroCard>
        </div>
      </div>

      {/* Footer Chaos */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
            <Coffee className="text-primary" />
          </div>
          <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center animate-bounce">
            <MessageCircle className="text-secondary" />
          </div>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground tracking-[0.5em] uppercase">
          End of the line. Go back to your assignments.
        </p>
      </div>
    </div>
  );
}
