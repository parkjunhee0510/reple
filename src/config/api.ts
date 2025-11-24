// src/config/api.ts
import axios from "axios";
import env from "@/config/env";

export const api = axios.create({
    baseURL: env.API_BASE_URL,
    withCredentials: true,
    timeout: 5000,
});
