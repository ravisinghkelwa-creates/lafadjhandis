import Parser from "rss-parser";
import OpenAI from "openai";

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; Lafadjhandis/1.0)',
  },
});

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export interface PulseItem {
  id: string;
  headline: string;
  summary: string;
  tag: "Campus" | "Alumni" | "Banaras" | "Culture";
  source: string;
  url: string;
  date: string;
}

const RSS_FEEDS = [
  { url: "https://news.google.com/rss/search?q=IIT+BHU&hl=en-IN&gl=IN&ceid=IN:en", tag: "Campus" as const },
  { url: "https://news.google.com/rss/search?q=BHU+Varanasi&hl=en-IN&gl=IN&ceid=IN:en", tag: "Campus" as const },
  { url: "https://news.google.com/rss/search?q=IIT+BHU+alumni&hl=en-IN&gl=IN&ceid=IN:en", tag: "Alumni" as const },
  { url: "https://news.google.com/rss/search?q=Varanasi+Banaras&hl=en-IN&gl=IN&ceid=IN:en", tag: "Banaras" as const },
];

let cachedPulse: PulseItem[] = [];
let lastFetch = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function cleanTitle(title: string): string {
  // Remove source suffix like " - Times of India"
  return title.replace(/\s*-\s*[^-]+$/, '').trim();
}

async function summarizeHeadline(headline: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a friendly news summarizer for a group of IIT BHU alumni. Write a casual, brief 1-line summary (max 15 words) in a warm, friendly tone. Add slight Banarasi/desi flavor if appropriate. No formal language."
        },
        {
          role: "user",
          content: `Summarize this headline casually: "${headline}"`
        }
      ],
      max_completion_tokens: 50,
      temperature: 0.7,
    });
    return response.choices[0]?.message?.content?.trim() || headline;
  } catch (error) {
    console.error("AI summary error:", error);
    return headline.length > 60 ? headline.slice(0, 60) + "..." : headline;
  }
}

export async function fetchPulse(): Promise<PulseItem[]> {
  const now = Date.now();
  
  // Return cache if still valid
  if (cachedPulse.length > 0 && now - lastFetch < CACHE_DURATION) {
    return cachedPulse;
  }

  const allItems: Array<{ headline: string; url: string; date: string; tag: PulseItem["tag"]; source: string }> = [];

  // Fetch all feeds in parallel
  const feedPromises = RSS_FEEDS.map(async (feed) => {
    try {
      const parsed = await parser.parseURL(feed.url);
      return parsed.items.slice(0, 3).map(item => ({
        headline: cleanTitle(item.title || ""),
        url: item.link || "",
        date: item.pubDate || new Date().toISOString(),
        tag: feed.tag,
        source: item.source?.name || extractSource(item.title || ""),
      }));
    } catch (error) {
      console.error(`Feed error for ${feed.url}:`, error);
      return [];
    }
  });

  const results = await Promise.all(feedPromises);
  results.forEach(items => allItems.push(...items));

  // Dedupe by headline similarity and sort by date
  const seen = new Set<string>();
  const uniqueItems = allItems.filter(item => {
    const key = item.headline.toLowerCase().slice(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  uniqueItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Return fallback if no items found
  if (uniqueItems.length === 0) {
    return getFallbackPulse();
  }

  // Take top 5 and summarize
  const topItems = uniqueItems.slice(0, 5);
  
  const pulseItems: PulseItem[] = await Promise.all(
    topItems.map(async (item, i) => ({
      id: `pulse-${i}-${Date.now()}`,
      headline: item.headline,
      summary: await summarizeHeadline(item.headline),
      tag: item.tag,
      source: item.source,
      url: item.url,
      date: formatDate(item.date),
    }))
  );

  cachedPulse = pulseItems;
  lastFetch = now;
  
  return pulseItems;
}

function extractSource(title: string): string {
  const match = title.match(/-\s*([^-]+)$/);
  return match ? match[1].trim() : "News";
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return "Yesterday";
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  } catch {
    return "Recent";
  }
}

// Fallback data if feeds fail
export function getFallbackPulse(): PulseItem[] {
  return [
    {
      id: "fallback-1",
      headline: "IIT BHU continues to shine in research and innovation",
      summary: "Apna campus aage badh raha hai, research mein.",
      tag: "Campus",
      source: "News",
      url: "#",
      date: "Today"
    },
    {
      id: "fallback-2", 
      headline: "Varanasi gears up for Dev Deepawali celebrations",
      summary: "Ganga ghat pe diyon ki roshni ka intezaar.",
      tag: "Banaras",
      source: "News",
      url: "#",
      date: "Today"
    }
  ];
}
