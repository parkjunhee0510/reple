import React, { useEffect, useState } from "react";
import { api } from "../config";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Home.css";

const Home = () => {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            api.get("/user/me")
                .then((res) => setUser(res.data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div className="home-container">로그인이 필요합니다.</div>;
    }

    if (loading) {
        return (
            <div className="home-container">
                <div className="loading-card">불러오는 중...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="home-container">
            </div>
        );
    }

    return (
        <div className="home-wrapper">

            {/* 상단 프로필 카드 */}
            <section className="home-profile-card">
                <img src={user.profileImage} alt="profile" className="home-profile-img" />
                <div>
                    <h2>{user.nickname}님, 환영합니다! 👋</h2>
                    <p>오늘도 멋진 하루 되세요.</p>
                </div>
            </section>

            {/* 퀵 액션 메뉴 */}
            <section className="home-actions">
                <div className="action-item" onClick={() => window.location.href="/profile"}>
                    <span>📝</span>
                    <p>프로필 관리</p>
                </div>
                <div className="action-item">
                    <span>⚙️</span>
                    <p>설정</p>
                </div>
                <div className="action-item">
                    <span>📄</span>
                    <p>내 활동</p>
                </div>
                <div className="action-item" onClick={() => alert("준비중입니다!")}>
                    <span>⭐</span>
                    <p>즐겨찾기</p>
                </div>
            </section>

            {/* 아래 카드 영역 */}
            <section className="home-cards">
                <div className="info-card">
                    <h3>공지사항</h3>
                    <p>새로운 업데이트가 적용되었습니다.</p>
                </div>
                <div className="info-card">
                    <h3>추천 콘텐츠</h3>
                    <p>당신을 위한 맞춤 기능을 준비 중입니다.</p>
                </div>
            </section>

        </div>
    );
};

export default Home;
