import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface RetroCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "accent";
  delay?: number;
}

export function RetroCard({ children, className, glowColor = "primary", delay = 0 }: RetroCardProps) {
  const glowStyles = {
    primary: "hover:border-primary/30",
    secondary: "hover:border-secondary/30",
    accent: "hover:border-accent/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className={cn(
        "bg-card border border-border/50 rounded-lg p-6 transition-all duration-200 relative group",
        glowStyles[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
