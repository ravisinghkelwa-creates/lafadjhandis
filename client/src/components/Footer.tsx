import { Heart, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border mt-auto bg-card/30">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} lafadjhandis. Built for the legends.
        </p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-destructive animate-pulse" />
          <span>and nostalgia</span>
        </div>
      </div>
    </footer>
  );
}
