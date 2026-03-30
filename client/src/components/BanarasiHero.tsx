import { cn } from "@/lib/utils";

interface BanarasiHeroProps {
  image?: string;
  className?: string;
  opacity?: number;
  showWatermark?: boolean;
  intense?: boolean;
}

const banarasImages = {
  ghats: "https://images.unsplash.com/photo-1609947017136-9daf32a71c03?auto=format&fit=crop&q=80&w=1920",
  ganga: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=1920",
  assiGhat: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1920",
};

const watermarkTexts = ["काशी", "बनारस", "गंगा"];

export function BanarasiHero({ 
  image, 
  className, 
  opacity = 8, 
  showWatermark = true,
  intense = false 
}: BanarasiHeroProps) {
  const bgImage = image || banarasImages.ganga;
  const effectiveOpacity = intense ? Math.min(opacity * 1.2, 12) : opacity;
  
  return (
    <>
      {/* Background Image Layer - Subtle but visible */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center scale-110",
          className
        )}
        style={{ 
          backgroundImage: `url(${bgImage})`,
          opacity: effectiveOpacity / 100,
          filter: "blur(4px) grayscale(40%) sepia(20%) brightness(0.8) contrast(1.1)"
        }}
      />
      
      {/* Dark Gradient Overlay - Ensures text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: intense 
            ? "linear-gradient(to bottom, hsl(var(--background) / 0.75) 0%, hsl(var(--background) / 0.6) 40%, hsl(var(--background) / 0.85) 100%)"
            : "linear-gradient(to bottom, hsl(var(--background) / 0.8) 0%, hsl(var(--background) / 0.65) 50%, hsl(var(--background) / 0.9) 100%)"
        }}
      />
      
      {/* Subtle Watermark Text */}
      {showWatermark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {watermarkTexts.map((text, i) => (
            <span
              key={text}
              className="absolute font-display text-foreground/[0.025] whitespace-nowrap"
              style={{
                fontSize: `${100 + i * 30}px`,
                top: `${10 + i * 28}%`,
                left: `${-5 + i * 30}%`,
                transform: `rotate(${-8 + i * 4}deg)`,
              }}
            >
              {text}
            </span>
          ))}
        </div>
      )}
      
      {/* Grain/Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.6) 100%)"
        }}
      />
    </>
  );
}

export { banarasImages };
