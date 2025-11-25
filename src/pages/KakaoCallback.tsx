import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const KakaoCallback = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            // 자동 로그인 여부 가져오기
            const autoLoginStored = localStorage.getItem("auto_login") === "true";

            // 로그인
            login(token, autoLoginStored);

            // auto_login 값은 1회용이므로 삭제
            localStorage.removeItem("auto_login");

            navigate("/");
        }
    }, []);

    return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
