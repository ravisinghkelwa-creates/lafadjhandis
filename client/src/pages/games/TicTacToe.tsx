import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RetroCard } from "@/components/RetroCard";
import { PageHeader } from "@/components/PageHeader";

type Square = "X" | "O" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: Square[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(Boolean) 
      ? "It's a Draw!" 
      : `Next player: ${isXNext ? "X" : "O"}`;

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const nextBoard = board.slice();
    nextBoard[i] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <PageHeader title="Tic Tac Toe" subtitle="2-Player Local Duel" />
      
      <div className="mb-8 text-2xl font-mono text-primary text-glow">{status}</div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-[300px]">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="h-20 w-20 bg-card border-2 border-primary/20 rounded-lg text-3xl font-display flex items-center justify-center hover:bg-primary/10 transition-colors"
          >
            {square && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={square === "X" ? "text-primary" : "text-secondary"}
              >
                {square}
              </motion.span>
            )}
          </button>
        ))}
      </div>

      <Button onClick={resetGame} variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10">
        Reset Game
      </Button>
    </div>
  );
}
