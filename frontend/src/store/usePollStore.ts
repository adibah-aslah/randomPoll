import { pollService } from "@/services/api";
import type {
  Poll,
  RawPollResponse,
  PollOption,
  BackendPollOption,
} from "@/types/poll";
import { create } from "zustand";

interface PollState {
  polls: Poll[];
  isLoading: boolean;
  error: string | null;
  fetchPolls: () => Promise<void>;
  votePollLocal: (pollId: string, optionIndex: number) => void;
  createPoll: (pollData: {
    question: string;
    category?: string;
    options: string[];
  }) => Promise<boolean>;
}

// 👇 Default poll — tunjuk bila database kosong (belum ada data real)
const DEFAULT_POLL: Poll = {
  id: "default-poll",
  question: "Nasi lemak ke roti canai untuk breakfast?",
  category: "Community",
  totalVotes: 0,
  options: [
    { label: "Nasi Lemak", votes: 0 },
    { label: "Roti Canai", votes: 0 },
  ],
};

export const usePollStore = create<PollState>((set, get) => ({
  polls: [],
  isLoading: false,
  error: null,

  fetchPolls: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await pollService.getPolls();

      const normalized: Poll[] = response.map((poll: RawPollResponse) => {
        let options: PollOption[] = [];
        let totalVotes = poll.totalVotes || 0;

        if (
          poll.options &&
          Array.isArray(poll.options) &&
          poll.options.length > 0
        ) {
          const firstOption = poll.options[0];

          if (
            typeof firstOption === "object" &&
            firstOption &&
            "text" in firstOption
          ) {
            options = (poll.options as BackendPollOption[]).map(
              (opt: BackendPollOption) => ({
                label: opt.text,
                votes: opt.votes || 0,
              }),
            );
            totalVotes =
              poll.totalVotes ||
              options.reduce((sum, opt) => sum + opt.votes, 0);
          } else if (typeof firstOption === "string") {
            options = (poll.options as BackendPollOption[]).map((opt) => ({
              label: opt.text,
              votes: opt.votes,
            }));
          }
        }

        return {
          id: poll.id,
          question: poll.question,
          category: poll.category || "Community",
          options,
          totalVotes,
          createdAt: poll.createdAt,
        };
      });

      // 👇 Kalau backend return kosong, guna default poll sebagai fallback
      set({
        polls: normalized.length > 0 ? normalized : [DEFAULT_POLL],
        isLoading: false,
      });
    } catch (error) {
      console.error("Fetch failed", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to load polls. Please try again.";

      set({
        error: message,
        isLoading: false,
      });
    }
  },

  votePollLocal: (pollId: string, optionIndex: number) =>
    set((state) => ({
      polls: state.polls.map((poll) => {
        if (poll.id !== pollId) return poll;
        if (!poll.options || poll.options.length <= optionIndex) return poll;

        const updatedOptions: PollOption[] = poll.options.map((option, idx) =>
          idx === optionIndex ? { ...option, votes: option.votes + 1 } : option,
        );

        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1,
        };
      }),
    })),

  createPoll: async (pollData) => {
    set({ isLoading: true, error: null });
    try {
      await pollService.createPoll(pollData);
      await get().fetchPolls();
      return true;
    } catch (error) {
      console.error("Create poll failed", error);
      set({
        error: "Failed to create your poll. Please try again.",
        isLoading: false,
      });
      return false;
    }
  },
}));
