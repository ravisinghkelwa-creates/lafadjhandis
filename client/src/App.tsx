import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Legends from "@/pages/Legends";
import MemoryVault from "@/pages/MemoryVault";
import Timeline from "@/pages/Timeline";
import MusicLounge from "@/pages/MusicLounge";
import Games from "@/pages/Games";
import TicTacToe from "@/pages/games/TicTacToe";
import RPS from "@/pages/games/RPS";
import AiZone from "@/pages/AiZone";
import DailyDarshan from "@/pages/DailyDarshan";
import Bakchodi from "@/pages/Bakchodi";
import IITBHUQuiz from "@/pages/quiz/IITBHUQuiz";
import Pulse from "@/pages/Pulse";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/legends" component={Legends} />
      <Route path="/vault" component={MemoryVault} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/music" component={MusicLounge} />
      <Route path="/games" component={Games} />
      <Route path="/games/tictactoe" component={TicTacToe} />
      <Route path="/games/rps" component={RPS} />
      <Route path="/ai" component={AiZone} />
      <Route path="/daily" component={DailyDarshan} />
      <Route path="/bakchodi" component={Bakchodi} />
      <Route path="/quiz/iitbhu" component={IITBHUQuiz} />
      <Route path="/pulse" component={Pulse} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground">
          <Navigation />
          <main className="flex-1 flex flex-col">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
