import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Newspaper, Radio, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { queryClient } from "@/lib/queryClient";

interface PulseItem {
  id: string;
  headline: string;
  summary: string;
  tag: "Campus" | "Alumni" | "Banaras" | "Culture";
  source: string;
  url: string;
  date: string;
}

const tagColors: Record<PulseItem["tag"], string> = {
  Campus: "bg-primary/10 text-primary border-primary/20",
  Alumni: "bg-accent/10 text-accent border-accent/20",
  Banaras: "bg-secondary/10 text-secondary border-secondary/20",
  Culture: "bg-muted text-muted-foreground border-muted",
};

export default function Pulse() {
  const { data: pulseItems, isLoading, refetch, isFetching } = useQuery<PulseItem[]>({
    queryKey: ["/api/pulse"],
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Radio className="w-5 h-5 text-secondary" />
            <h1 className="text-2xl md:text-3xl font-display">
              BHU × Banaras Pulse
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-mono">
            What's happening in campus, city, and alumni circles.
          </p>
        </motion.div>

        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            data-testid="button-refresh-pulse"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading updates...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pulseItems && pulseItems.length > 0 ? (
              pulseItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-elevate transition-all duration-200 border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge 
                            variant="outline" 
                            className={`${tagColors[item.tag]} text-xs`}
                            data-testid={`badge-tag-${item.id}`}
                          >
                            {item.tag}
                          </Badge>
                          <span className="text-muted-foreground/60 text-xs">
                            {item.date}
                          </span>
                        </div>
                        <span className="text-muted-foreground/50 text-xs shrink-0">
                          {item.source}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 leading-snug" data-testid={`text-headline-${item.id}`}>
                        {item.headline}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4" data-testid={`text-summary-${item.id}`}>
                        {item.summary}
                      </p>
                      
                      {item.url && item.url !== "#" && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary text-sm hover:underline"
                          data-testid={`link-read-more-${item.id}`}
                        >
                          Read More
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Newspaper className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Abhi koi updates nahi mili.
                  </p>
                  <p className="text-muted-foreground/60 text-sm mt-1">
                    Thodi der mein try karo.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="mt-8 text-center text-muted-foreground/50 text-xs">
          Auto-refreshes every 30 minutes
        </div>
      </div>
    </div>
  );
}
