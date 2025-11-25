// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../config";

interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string, autoLogin?: boolean) => void;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    token: null,
    login: () => {},
    logout: async () => {},
    isLoading: true,
});

// -----------------------------------------------------

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 앱 최초 실행 시 토큰 복원
    useEffect(() => {
        const savedToken =
            localStorage.getItem("access_token") ||
            sessionStorage.getItem("access_token");

        if (savedToken) setToken(savedToken);

        setIsLoading(false);
    }, []);

    //  로그인 토큰 저장 + 상태 반영
    const login = (newToken: string, autoLogin: boolean = true) => {
        if (autoLogin) {
            localStorage.setItem("access_token", newToken);
            sessionStorage.removeItem("access_token");
        } else {
            sessionStorage.setItem("access_token", newToken);
            localStorage.removeItem("access_token");
        }

        setToken(newToken);
    };

    // 로그아웃 서버 + 클라이언트 처리
    const logout = async () => {
        try {
            await api.post("/user/logout", {}); // refresh token 삭제
        } catch (err) {
            console.warn("로그아웃 요청 실패 (무시 가능)", err);
        }

        // 클라이언트 모든 인증 정보 제거
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");

        setToken(null);
    };

    const value: AuthContextProps = {
        isAuthenticated: !!token,
        token,
        login,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook
export const useAuth = () => useContext(AuthContext);
