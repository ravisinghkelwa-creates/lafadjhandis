import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertTimelineEvent } from "@shared/schema";

export function useTimeline() {
  return useQuery({
    queryKey: [api.timeline.list.path],
    queryFn: async () => {
      const res = await fetch(api.timeline.list.path);
      if (!res.ok) throw new Error("Failed to fetch timeline");
      return api.timeline.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateTimelineEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertTimelineEvent) => {
      const res = await fetch(api.timeline.create.path, {
        method: api.timeline.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create timeline event");
      return api.timeline.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.timeline.list.path] });
    },
  });
}
