import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/ProfileModal.css";

interface Props {
    nickname: string;
    profileImage: string;
    onClose: () => void;
}

const ProfileModal = ({ nickname, profileImage, onClose }: Props) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const goToProfile = () => {
        onClose();
        navigate("/profile");
    };

    const handleLogout = async () => {
        await logout();
        onClose();
        navigate("/login");
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <button className="modal-close-x" onClick={onClose}>
                    ✕
                </button>

                <img src={profileImage} alt="profile" className="modal-profile-img" />

                <h3 className="modal-nickname">{nickname}</h3>

                <button className="modal-btn" onClick={goToProfile}>
                    프로필 관리
                </button>

                <button className="modal-logout-btn" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default ProfileModal;
