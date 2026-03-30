import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertLegend } from "@shared/schema";

export function useLegends() {
  return useQuery({
    queryKey: [api.legends.list.path],
    queryFn: async () => {
      const res = await fetch(api.legends.list.path);
      if (!res.ok) throw new Error("Failed to fetch legends");
      return api.legends.list.responses[200].parse(await res.json());
    },
  });
}

export function useLegend(id: number) {
  return useQuery({
    queryKey: [api.legends.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.legends.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch legend");
      return api.legends.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateLegend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertLegend) => {
      const res = await fetch(api.legends.create.path, {
        method: api.legends.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create legend");
      return api.legends.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.legends.list.path] });
    },
  });
}
