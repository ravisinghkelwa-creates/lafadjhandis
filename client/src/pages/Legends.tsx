import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";
import { BanarasiHero } from "@/components/BanarasiHero";

export default function Legends() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative py-8 mb-8 -mx-4 px-4 overflow-hidden">
        <BanarasiHero opacity={8} />
        <div className="relative z-10">
          <PageHeader 
            title="The Legends" 
            subtitle="The founders, the friends, the family." 
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <RetroCard glowColor="primary" className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Ruko zara, sabar rakho!
          </h2>
          
          <p className="text-muted-foreground font-mono text-sm mb-6">
            Legends are being summoned from the archives of Banaras.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-accent">
            <Clock className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>
        </RetroCard>
      </motion.div>
    </div>
  );
}
