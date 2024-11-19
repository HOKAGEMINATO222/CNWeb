import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: "littlemozart22",
        name: "mhoang",
        email: "ho*******@gmail.com",
        phone: "********73",
        gender: "Nam",
        birthdate: "**/02/20**",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="profile-container">
            {/* Thanh Tìm Kiếm */}
            <div className="search-bar">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <button className="search-button">🔍</button>
            </div>

            <h2>Hồ Sơ Của Tôi</h2>

            {/* Sidebar */}
            <div className="sidebar">
                <button onClick={() => navigate("/")} className="sidebar-button">TECH STORE</button>
                <button onClick={() => navigate("/cart")} className="sidebar-button">Giỏ Hàng</button>
                <button onClick={toggleEditMode} className="sidebar-button">Chỉnh Sửa Hồ Sơ</button>
                <button onClick={() => navigate("/logout")} className="sidebar-button">Đăng Xuất</button>
            </div>

            {/* Nội Dung Hồ Sơ với Avatar và Thông Tin */}
            <div className="profile-main">
                {/* Phần Avatar */}
                <div className="avatar-section">
                    <img src="path/to/avatar.jpg" alt="Avatar" className="avatar" />
                    {isEditing && <button className="choose-image-button">Chọn Ảnh</button>}
                </div>

                {/* Phần Thông Tin Hồ Sơ */}
                <div className="profile-info">
                    <label>Tên đăng nhập</label>
                    <p>{profile.username}</p>

                    <label htmlFor="name">Tên</label>
                    {isEditing ? (
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{profile.name}</p>
                    )}

                    <label>Email</label>
                    <p>{profile.email}</p>

                    <label>Số điện thoại</label>
                    <p>{profile.phone}</p>

                    <label>Giới tính</label>
                    <p>{profile.gender}</p>

                    <label>Ngày sinh</label>
                    <p>{profile.birthdate}</p>

                    {isEditing && (
                        <div className="edit-buttons">
                            <button className="save-button">Lưu</button>
                            <button className="cancel-button" onClick={toggleEditMode}>Hủy</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
