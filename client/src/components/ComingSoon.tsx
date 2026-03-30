import { Construction } from "lucide-react";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center border-2 border-dashed border-border rounded-3xl bg-card/20">
      <Construction className="w-16 h-16 text-primary mb-6 animate-bounce" />
      <h2 className="text-3xl font-display mb-4 text-foreground">{title}</h2>
      <p className="text-muted-foreground max-w-md font-mono">
        This zone is currently under construction. The pixels are being polished as we speak. Check back later!
      </p>
    </div>
  );
}
