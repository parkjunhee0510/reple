// src/config/axios.ts
import axios from "axios";
import { env } from "./index";

const api = axios.create({
    baseURL: env.API_BASE_URL,
    withCredentials: true, // refresh_token 쿠키 전송 가능
});

// ===============================
//  1. 요청 인터셉터 (Access Token 자동 첨부)
// ===============================
api.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem("access_token") ||
            sessionStorage.getItem("access_token");


        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ===============================
// 2. 응답 인터셉터 (토큰 자동 재발급)
// ===============================
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// refresh 토큰 기다린 뒤 재요청하는 함수
function onRefreshed(token: string) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // access token 만료 → 401 발생
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // 이미 refresh 시도 중이면 queue에 등록하고 대기
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push((newToken: string) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                // refresh token 요청
                const refreshRes = await api.post("/user/refresh");

                const newAccessToken = refreshRes.data.data.accessToken;

                // 저장
                localStorage.setItem("access_token", newAccessToken);

                // 대기하던 요청들 재실행
                onRefreshed(newAccessToken);

                // 현재 요청 재실행
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh failed → Logout required");

                localStorage.removeItem("access_token");

                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
