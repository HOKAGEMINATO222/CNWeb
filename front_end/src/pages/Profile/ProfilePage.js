import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = (confirm) => {
        if (confirm) {
            navigate("/"); // Chuyển về trang chủ ở trạng thái khách
        }
        setShowLogoutConfirm(false);
    };

    return (
        <div className="profile-container">
            {/* Thanh Tìm Kiếm */}
            <div className="search-bar">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <button className="search-button">🔍</button>
            </div>

            <h2>Hồ Sơ Của Tôi</h2>

            <div className="profile-content">
                {/* Cột Bên Trái */}
                <div className="sidebar">
                    <Link to="/" className="sidebar-link">TECH STORE</Link>
                    <button onClick={() => navigate("/cart")} className="sidebar-button">Giỏ Hàng</button>
                    <button onClick={toggleEditMode} className="sidebar-button">
                        Chỉnh Sửa Hồ Sơ
                    </button>
                    <button onClick={handleLogout} className="sidebar-button">Đăng Xuất</button>
                </div>

                {/* Nội Dung Hồ Sơ */}
                <div className="profile-info">
                    <div className="avatar-section">
                        <img src="path/to/avatar.jpg" alt="Avatar" className="avatar" />
                        {isEditing && <button className="choose-image-button">Chọn Ảnh</button>}
                    </div>

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
                    {isEditing ? (
                        <div className="gender-options">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Nam"
                                checked={profile.gender === "Nam"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="male">Nam</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Nữ"
                                checked={profile.gender === "Nữ"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="female">Nữ</label>
                            <input
                                type="radio"
                                id="other"
                                name="gender"
                                value="Khác"
                                checked={profile.gender === "Khác"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="other">Khác</label>
                        </div>
                    ) : (
                        <p>{profile.gender}</p>
                    )}

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

            {/* Xác Nhận Đăng Xuất */}
            {showLogoutConfirm && (
                <div className="logout-confirmation">
                    <p>Bạn có chắc muốn đăng xuất không?</p>
                    <button onClick={() => confirmLogout(true)}>Có</button>
                    <button onClick={() => confirmLogout(false)}>Không</button>
                </div>
            )}
        </div>
    );
}
