import type { RawPollResponse } from "@/types/poll";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const pollService = {
  // Explicitly type the Axios response
  getPolls: async (): Promise<RawPollResponse[]> => {
    const { data } = await apiClient.get<RawPollResponse[]>("/poll");
    return data;
  },

  createPoll: async (pollData: {
    question: string;
    category?: string;
    options: string[];
  }): Promise<RawPollResponse> => {
    const { data } = await apiClient.post<RawPollResponse>("/poll", pollData);
    return data;
  },
};
