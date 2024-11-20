import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState("viewProfile");
    const [isEditing, setIsEditing] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Trạng thái hiển thị modal xác nhận đăng xuất
    const [profile, setProfile] = useState({
        username: "littlemozart22",
        name: "mhoang",
        email: "ho*******@gmail.com",
        phone: "********73",
        gender: "Nam",
        birthdate: "**/02/20**",
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    };

    const saveProfile = () => {
        setIsEditing(false);
        alert("Thông tin cá nhân đã được cập nhật!");
    };

    const savePassword = () => {
        if (password.newPassword === password.confirmPassword) {
            alert("Mật khẩu đã được cập nhật!");
        } else {
            alert("Mật khẩu xác nhận không khớp!");
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true); // Hiển thị modal xác nhận đăng xuất
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        alert("Đăng xuất thành công!"); // Xử lý logic đăng xuất ở đây
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <div>
            {/* Thanh bar trên cùng */}
            <div className="pro5-header-bar">
                <div className="header-left">
                    <Link to="/" className="tech-store-link">TECH STORE</Link>
                    <span className="pro5-title">HỒ SƠ</span>
                </div>
                <div className="header-right">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="search-input"
                    />
                    <button className="search-button">🔍</button>
                </div>
            </div>
            {/*content chính */}
            <div className="profile-container">
                {/* Cột bên trái */}
                <div className="left-column">
                    <h3>Hồ sơ của tôi</h3>
                    <ul>
                        <li onClick={() => setActiveSection("viewProfile")}>
                            Hồ sơ
                        </li>
                        <li onClick={() => setActiveSection("editProfile")}>
                            Chỉnh sửa hồ sơ
                        </li>
                        <li onClick={() => setActiveSection("changePassword")}>
                            Đổi mật khẩu
                        </li>
                        <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                </div>

                {/* Cột giữa */}
                <div className="middle-column">
                    {activeSection === "viewProfile" && (
                        <>
                            <h2>Hồ Sơ Của Tôi</h2>
                            <div className="profile-info">
                                <label>Tên đăng nhập</label>
                                <p>{profile.username}</p>

                                <label>Tên</label>
                                <p>{profile.name}</p>

                                <label>Email</label>
                                <p>{profile.email}</p>

                                <label>Số điện thoại</label>
                                <p>{profile.phone}</p>

                                <label>Giới tính</label>
                                <p>{profile.gender}</p>

                                <label>Ngày sinh</label>
                                <p>{profile.birthdate}</p>
                            </div>
                        </>
                    )}

                    {activeSection === "editProfile" && (
                        <>
                            <h2>Chỉnh Sửa Hồ Sơ</h2>
                            <div className="profile-info">
                                <label>Tên đăng nhập</label>
                                <p>{profile.username}</p>

                                <label>Tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                />

                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                />

                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                />

                                <label>Giới tính</label>
                                <select
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>

                                <label style={{ paddingTop: '10px' }}>Ngày sinh</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={profile.birthdate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-buttons">
                                <button className="save-button" onClick={saveProfile}>
                                    Lưu
                                </button>
                                <button
                                    className="cancel-button"
                                    onClick={() => setActiveSection("viewProfile")}
                                >
                                    Hủy
                                </button>
                            </div>
                        </>
                    )}

                    {activeSection === "changePassword" && (
                        <>
                            <h2>Đổi Mật Khẩu</h2>
                            <div className="password-section">
                                <label>Mật khẩu hiện tại</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={password.currentPassword}
                                    onChange={handlePasswordChange}
                                />

                                <label>Mật khẩu mới</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={password.newPassword}
                                    onChange={handlePasswordChange}
                                />

                                <label>Xác nhận mật khẩu mới</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={password.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="edit-buttons">
                                <button className="save-button" onClick={savePassword}>
                                    Lưu
                                </button>
                                <button
                                    className="cancel-button"
                                    onClick={() => setActiveSection("viewProfile")}
                                >
                                    Hủy
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Cột bên phải */}
                <div className="right-column">
                    <img
                        src="/images/ava.jpg"
                        alt="Avatar"
                        className="avatar"
                    />
                    {activeSection === "editProfile" && (
                        <button className="choose-image-button">Chọn Ảnh Mới</button>
                    )}
                </div>

                {/* Modal xác nhận đăng xuất */}
                {showLogoutModal && (
                    <div className="logout-modal">
                        <div className="logout-modal-content">
                            <p>Bạn có chắc chắn muốn đăng xuất?</p>
                            <button className="confirm-button" onClick={confirmLogout}>
                                Đồng ý
                            </button>
                            <button className="cancel-button" onClick={cancelLogout}>
                                Hủy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
