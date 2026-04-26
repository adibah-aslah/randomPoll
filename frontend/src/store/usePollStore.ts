import { pollService } from "@/services/api";
import type { Poll } from "@/types/poll";
import { create } from "zustand";

interface PollState {
  polls: Poll[];
  isLoading: boolean;
  error: string | null;
  fetchPolls: () => Promise<void>;
}

export const usePollStore = create<PollState>((set) => ({
  polls: [],
  isLoading: false,
  error: null,

  fetchPolls: async () => {
    set({ isLoading: true });
    try {
      const response = await pollService.getPolls();
      set({ polls: response, isLoading: true });
    } catch (error) {
      console.error("Fetch failed", error);
      set({ isLoading: false });
    }
  },
}));
