// pages/Home/Home.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home({ isLoggedIn }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const categoryData = {
        "Tất cả sản phẩm": [
            {
                id: 1,
                image: "/images/iphone16promax.png",
                name: "Iphone 16 Pro Max",
                price: "46.999.000₫",
                rating: 4.8,
                sold: "60,1k"
            },
        ],
        "Điện Thoại": [
            {
                id: 3,
                image: "/images/samsung-galaxy.png",
                name: "Samsung Galaxy S22",
                price: "29.999.000₫",
                rating: 4.5,
                sold: "20k"
            },
            // Thêm sản phẩm khác cho danh mục "Điện Thoại"
        ],
        "Laptop": [
            {
                id: 4,
                image: "/images/dell-xps.png",
                name: "Laptop Dell XPS 15",
                price: "50.000.000₫",
                rating: 4.9,
                sold: "15k"
            },
            // Thêm sản phẩm khác cho danh mục "Laptop"
        ],
        "Phụ Kiện": [
            {
                id: 5,
                image: "/images/phone-case.png",
                name: "Ốp lưng điện thoại",
                price: "150.000₫",
                rating: 4.6,
                sold: "10k"
            },
            // Thêm sản phẩm khác cho danh mục "Phụ Kiện"
        ],
        "Tai Nghe": [
            {
                id: 6,
                image: "/images/sony-headphones.png",
                name: "Tai nghe Sony WH-1000XM4",
                price: "8.000.000₫",
                rating: 4.8,
                sold: "5k"
            },
            // Thêm sản phẩm khác cho danh mục "Tai Nghe"
        ],
        "Dây Sạc": [
            {
                id: 7,
                image: "/images/charging-cable.png",
                name: "Dây sạc USB-C",
                price: "200.000₫",
                rating: 4.5,
                sold: "8k"
            },
            // Thêm sản phẩm khác cho danh mục "Dây Sạc"
        ],
    };

    return (
        <div className="home-container">
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

            <section className="product-categories">
                <h2>Danh Mục Sản Phẩm</h2>
                <div className="category-list">
                    {Object.keys(categoryData).map((category) => (
                        <div
                            key={category}
                            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </section>

            {/* Hiển thị sản phẩm của danh mục đã chọn hoặc tất cả sản phẩm nếu không chọn danh mục */}
            <section className="category-products">
                <h3>Sản phẩm trong danh mục: {selectedCategory || "Tất cả sản phẩm"}</h3>
                <div className="product-list">
                    {(selectedCategory ? categoryData[selectedCategory] : categoryData["Tất cả sản phẩm"]).map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-price">
                                {product.price} <span className="product-discount">{product.discount || ""}</span>
                            </p>
                            <p className="product-rating">⭐ {product.rating} | Đã bán {product.sold}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
