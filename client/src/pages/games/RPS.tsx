import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

const choices = [
  { name: "Rock", icon: "✊" },
  { name: "Paper", icon: "✋" },
  { name: "Scissors", icon: "✌️" }
] as const;

export default function RPS() {
  const [userChoice, setUserChoice] = useState<typeof choices[number] | null>(null);
  const [computerChoice, setComputerChoice] = useState<typeof choices[number] | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const playGame = (choice: typeof choices[number]) => {
    const pc = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(pc);

    if (choice.name === pc.name) {
      setResult("It's a Tie!");
    } else if (
      (choice.name === "Rock" && pc.name === "Scissors") ||
      (choice.name === "Paper" && pc.name === "Rock") ||
      (choice.name === "Scissors" && pc.name === "Paper")
    ) {
      setResult("You Win!");
    } else {
      setResult("Computer Wins!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <PageHeader title="RPS" subtitle="Man vs Machine" />

      <div className="flex gap-4 mb-12">
        {choices.map((c) => (
          <Button
            key={c.name}
            onClick={() => playGame(c)}
            className="h-24 w-24 text-4xl bg-card border-2 border-secondary/20 hover:border-secondary transition-all flex flex-col items-center justify-center"
          >
            <span>{c.icon}</span>
            <span className="text-xs mt-2 font-mono">{c.name}</span>
          </Button>
        ))}
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-12 text-6xl">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground uppercase">You</span>
              <span>{userChoice?.icon}</span>
            </div>
            <span className="text-2xl font-display text-muted-foreground italic">VS</span>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground uppercase">Bot</span>
              <span>{computerChoice?.icon}</span>
            </div>
          </div>
          <div className="text-3xl font-display text-secondary text-glow-rust">{result}</div>
        </motion.div>
      )}
    </div>
  );
}
