// src/config/axios.ts
import axios from "axios";
import env from "./env";

const api = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 10000,
});

export default api;
