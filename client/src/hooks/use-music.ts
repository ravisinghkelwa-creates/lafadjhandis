import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertMusicTrack } from "@shared/schema";

export function useMusic() {
  return useQuery({
    queryKey: [api.music.list.path],
    queryFn: async () => {
      const res = await fetch(api.music.list.path);
      if (!res.ok) throw new Error("Failed to fetch music");
      return api.music.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateMusicTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertMusicTrack) => {
      const res = await fetch(api.music.create.path, {
        method: api.music.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create track");
      return api.music.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.music.list.path] });
    },
  });
}
