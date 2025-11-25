// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../config";

interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string, autoLogin?: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    token: null,
    login: () => {},
    logout: () => {},
});

// Provider -----------------------------------------------------

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    // 앱 시작 시 localStorage or sessionStorage에서 토큰 가져오기
    useEffect(() => {
        const savedToken =
            localStorage.getItem("access_token") ||
            sessionStorage.getItem("access_token");

        if (savedToken) setToken(savedToken);
    }, []);

    const login = (token: string, autoLogin: boolean = true) => {
        if (autoLogin) {
            localStorage.setItem("access_token", token);
            sessionStorage.removeItem("access_token");
        } else {
            sessionStorage.setItem("access_token", token);
            localStorage.removeItem("access_token");
        }
        setToken(token);
    };

    const logout = async () => {
        await api.post("/user/logout", {}); // withCredentials는 axios 설정에 이미 있음

        // 모든 저장소에서 삭제
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");

        setToken(null);
    };

    const value: AuthContextProps = {
        isAuthenticated: !!token,
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook ---------------------------------------------------------

export const useAuth = () => useContext(AuthContext);
