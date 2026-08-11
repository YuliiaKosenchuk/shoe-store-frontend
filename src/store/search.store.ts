import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_HISTORY = 10;

interface SearchState {
  history: string[];
  hasHydrated: boolean;
  addQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      history: [],
      hasHydrated: false,

      addQuery: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        set((state) => ({
          history: [
            trimmed,
            ...state.history.filter(
              (entry) => entry.toLowerCase() !== trimmed.toLowerCase(),
            ),
          ].slice(0, MAX_HISTORY),
        }));
      },
    }),
    {
      name: "search-history",
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    },
  ),
);
