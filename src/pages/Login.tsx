import React, {useState} from "react";
import "../styles/Login.css";
import { endpoint } from "../config/index";


const Login = () => {
    const [autoLogin, setAutoLogin] = useState(false);

    const handleKakaoLogin = () => {
        localStorage.setItem("auto_login", autoLogin ? "true" : "false");

        window.location.href = endpoint.OAUTH2_KAKAO;
    };

    return (
        <div>
            <button onClick={handleKakaoLogin} className="kakao-login-btn">
                카카오로 로그인
            </button>

            <label>
                <input
                    type="checkbox"
                    checked={autoLogin}
                    onChange={() => setAutoLogin(!autoLogin)}
                />
                자동 로그인 유지
            </label>
        </div>
    );
};

export default Login;
