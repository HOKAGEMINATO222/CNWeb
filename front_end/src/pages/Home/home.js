import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import "./home.css";

export default function Home({ isLoggedIn }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate(); // Khởi tạo navigate

    // Đối tượng ánh xạ danh mục với đường dẫn
    const categoryPaths = {
        "Điện Thoại": "/phone",
        "Laptop": "/laptop",
        "Phụ kiện": "/accessories",
        "Tai nghe": "/headphones",
        "Dây sạc": "/cables",
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        // Điều hướng đến URL tương ứng
        const path = categoryPaths[category] || "/"; // Nếu không có, điều hướng về trang chủ
        navigate(path);
    };

    const categoryData = {
        "Tất cả sản phẩm": [
            {
                image: "/images/iphone16promax.png",
                name: "Iphone 16 Pro Max",
                price: "46.999.000₫",
                rating: 4.8,
                sold: "60,1k"
            },
            // Các sản phẩm khác
        ],
        "Điện Thoại": [ /* Dữ liệu các sản phẩm điện thoại */],
        "Laptop": [ /* Dữ liệu các sản phẩm laptop */],
        "Phụ kiện": [ /* Dữ liệu các sản phẩm phụ kiện */],
        "Tai nghe": [ /* Dữ liệu các sản phẩm tai nghe */],
        "Dây sạc": [ /* Dữ liệu các sản phẩm dây sạc */],
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
                    {(selectedCategory ? categoryData[selectedCategory] : categoryData["Tất cả sản phẩm"]).map((product, index) => (
                        <div key={index} className="product-item">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-price">
                                {product.price} <span className="product-discount"></span>
                            </p>
                            <p className="product-rating">⭐ {product.rating} | Đã bán {product.sold}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
