import type { RawPollResponse } from "@/types/poll";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const pollService = {
  // Explicitly type the Axios response
  getPolls: async (): Promise<RawPollResponse[]> => {
    const { data } = await apiClient.get<RawPollResponse[]>("/poll");
    return data;
  },
};
