// src/pages/ProductDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductDetail.css";

export default function ProductDetail({ categoryData }) {
    const { productName } = useParams(); // Lấy tên sản phẩm từ URL
    const navigate = useNavigate();

    // Tìm kiếm sản phẩm trong dữ liệu
    const product = categoryData["Tất cả sản phẩm"].find(
        (item) => item.name === productName
    );

    // Nếu không tìm thấy sản phẩm, điều hướng về trang chính
    if (!product) {
        navigate("/");
        return null;
    }

    return (
        <div className="product-detail-container">
            <button onClick={() => navigate(-1)}>← Trở lại</button>
            <div className="product-detail">
                <img src={product.image} alt={product.name} className="product-detail-image" />
                <h2>{product.name}</h2>
                <p className="product-detail-price">{product.price}</p>
                <p className="product-detail-rating">⭐ {product.rating} | Đã bán {product.sold}</p>
                <div className="product-detail-description">
                    <p>Mô tả sản phẩm: Đây là mô tả chi tiết cho {product.name}.</p>
                </div>
                <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
            </div>
        </div>
    );
}
