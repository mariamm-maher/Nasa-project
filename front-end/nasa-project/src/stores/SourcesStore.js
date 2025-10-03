import { create } from "zustand";

export const useSourcesStore = create((set) => ({
  sources: [],
  loading: false,
  error: null,

  fetchSources: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:8000/publications");
      if (!res.ok) throw new Error("Failed to fetch sources");
      const data = await res.json();
      set({ sources: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  searchSources: async (q) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `http://localhost:8000/publications/search?q=${encodeURIComponent(q)}`
      );
      if (!res.ok) throw new Error("Failed to search sources");
      const data = await res.json();
      set({ sources: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));