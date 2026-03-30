import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="py-12 md:py-16 text-center space-y-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground font-mono text-sm md:text-base max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mt-8 rounded-full" />
    </div>
  );
}
