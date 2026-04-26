import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const pollService = {
  getPolls: async () => {
    const { data } = await apiClient.get("/poll");
    return data;
  },
};
