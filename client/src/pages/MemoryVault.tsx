import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { motion } from "framer-motion";
import { Camera, Clock } from "lucide-react";
import { BanarasiHero } from "@/components/BanarasiHero";

export default function MemoryVault() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative py-8 mb-8 -mx-4 px-4 overflow-hidden">
        <BanarasiHero opacity={8} />
        <div className="relative z-10">
          <PageHeader 
            title="Memory Vault" 
            subtitle="Snapshots from the journey." 
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <RetroCard glowColor="secondary" className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
            <Camera className="w-10 h-10 text-secondary" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Thoda intezaar karo, photos dhund rahe hain!
          </h2>
          
          <p className="text-muted-foreground font-mono text-sm mb-6">
            Purani hard drives aur WhatsApp backups khod rahe hain.
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
