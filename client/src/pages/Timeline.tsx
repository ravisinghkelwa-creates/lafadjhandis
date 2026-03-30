import { useTimeline, useCreateTimelineEvent } from "@/hooks/use-timeline";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function Timeline() {
  const { data: events, isLoading } = useTimeline();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-mono">Syncing Timeline...</div>;

  // Group events by year
  const eventsByYear = events?.reduce((acc, event) => {
    const year = event.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {} as Record<number, typeof events>);

  const sortedYears = Object.keys(eventsByYear || {}).map(Number).sort((a, b) => b - a);

  return (
    <div className="container mx-auto px-4 pb-20">
      <PageHeader title="Timeline" subtitle="The history of our world, year by year." />

      <div className="max-w-3xl mx-auto relative">
        {/* Central Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2" />

        <div className="space-y-16">
          {sortedYears.map((year, yearIndex) => (
            <div key={year} className="relative">
              {/* Year Marker */}
              <div className="sticky top-20 z-10 flex items-center md:justify-center mb-8 pl-16 md:pl-0">
                <span className="px-4 py-2 rounded-full bg-background border border-primary text-primary font-display text-xl font-bold shadow-lg shadow-primary/20">
                  {year}
                </span>
              </div>

              <div className="space-y-12">
                {eventsByYear?.[year].map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex flex-col md:flex-row gap-8 relative ${
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className="md:w-1/2 pl-16 md:pl-0">
                      <div className="bg-card border border-border p-6 rounded-xl hover:border-secondary/50 transition-colors relative group">
                        {/* Dot on Timeline */}
                        <div className={`absolute top-6 w-4 h-4 rounded-full bg-background border-4 border-secondary shadow-[0_0_10px_hsl(var(--secondary))] 
                          -left-[2.25rem] md:left-auto md:right-auto
                          ${i % 2 === 0 ? "md:-left-[2.25rem]" : "md:-right-[2.25rem]"}
                        `} />
                        
                        <div className="flex items-center gap-2 mb-2 text-secondary text-sm font-mono">
                          <Calendar className="w-4 h-4" />
                          <span>Event {event.order}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-display">{event.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {(!events || events.length === 0) && (
            <div className="text-center py-20 pl-16 md:pl-0">
              <p className="text-muted-foreground font-mono">No events recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
