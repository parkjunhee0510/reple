import React, { useEffect, useState } from "react";
import { api } from "../config";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Profile.css";
import Skeleton from "../components/Skeleton";

const Profile = () => {
    const { token } = useAuth();

    const [nickname, setNickname] = useState("");
    const [profileUrl, setProfileUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // --------------------------
    // 🔥 유저 정보 불러오기
    // --------------------------
    useEffect(() => {
        api.get("/user/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setNickname(res.data.nickname);
                setProfileUrl(res.data.profileImage);
            })
            .finally(() => setLoading(false));
    }, [token]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        const form = new FormData();
        form.append("nickname", nickname);

        if (imageFile) {
            form.append("image", imageFile);
        }

        await api.post("/user/update", form, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        alert("프로필이 업데이트되었습니다!");
        window.location.reload();
    };

    // Skeleton 로딩 화면
    if (loading) {
        return (
            <div className="profile-container">
                <h1 className="profile-title">내 프로필</h1>

                <div className="image-section">
                    <Skeleton circle width={130} height={130} />
                </div>

                <Skeleton width={"60%"} height={20} />
                <Skeleton width={"100%"} height={50} />
            </div>
        );
    }

    // 보여줄 이미지 결정
    const imageSrc = previewImage || profileUrl || "/default-profile.png";

    return (
        <div className="profile-container">
            <h1 className="profile-title">내 프로필</h1>

            <div className="image-section">
                <img className="profile-image" src={imageSrc} alt="프로필 이미지" />

                <label className="upload-btn">
                    이미지 변경
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />
                </label>
            </div>

            <div className="input-group">
                <label>닉네임</label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>

            <button className="save-btn" onClick={handleSave}>
                저장하기
            </button>
        </div>
    );
};

export default Profile;
