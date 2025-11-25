import React, { useEffect, useState } from "react";
import { api } from "../config";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import Skeleton from "./Skeleton";
import "../styles/Header.css";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const [user, setUser] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            api.get("/user/me")
                .then((res) => setUser(res.data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [isAuthenticated]);

    return (
        <header className="header">
            <h2 className="logo">
                <Link to="/">MPJ</Link>
            </h2>

            <nav className="nav">
                {!isAuthenticated ? (
                    <Link to="/login" className="login-btn">로그인</Link>
                ) : loading ? (
                    <div className="profile-area">
                        <Skeleton circle width={36} height={36} />
                        <Skeleton width={60} height={16} />
                    </div>
                ) : (
                    <div
                        className="profile-area"
                        onClick={() => setShowModal(true)}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={user?.profileImage}
                            alt="profile"
                            className="profile-img"
                        />
                        <span className="nickname">{user?.nickname}</span>
                    </div>
                )}
            </nav>

            {showModal && user && (
                <ProfileModal
                    nickname={user.nickname}
                    profileImage={user.profileImage}
                    onClose={() => setShowModal(false)}
                />
            )}
        </header>
    );
};

export default Header;
