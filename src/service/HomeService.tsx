// src/services/homeService.ts
import { api } from "@/config/api";

export const getHomeData = async (title: string) => {
    try {
        const response = await api.get("/home", {
            params: { title },
        });

        return response.data;
    } catch (error) {
        console.error("getHomeData error:", error);
        throw error;
    }
};
