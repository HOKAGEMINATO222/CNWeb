import React from "react";
import { Link } from "react-router-dom";
// import Header from "../../components/Header"; // Import Header
import "./Home.css";

export default function Home({ isLoggedIn }) {
    return (
        <div className="home-container">
        

            {/* Phần tìm kiếm và các nút */}
            <div className="top-bar">
                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                    <button className="search-button">🔍</button>
                </div>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <>
                            <Link to="/cart" className="button">Xem Giỏ Hàng</Link>
                            <Link to="/profile" className="button">Xem Profile</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="button">Đăng Nhập</Link>
                            <Link to="/register" className="button">Đăng Ký</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Phần hiển thị danh mục sản phẩm */}
            <section className="product-categories">
                <h2>Danh Mục Sản Phẩm</h2>
                <div className="category-list">
                    <div className="category-item">Điện Thoại</div>
                    <div className="category-item">Laptop</div>
                    <div className="category-item">Phụ Kiện</div>
                    <div className="category-item">Tai Nghe</div>
                    <div className="category-item">Dây Sạc</div>
                </div>
            </section>
        </div>
    );
}
