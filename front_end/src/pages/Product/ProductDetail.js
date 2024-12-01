// src/pages/ProductDetail.js
import { Link } from 'react-router-dom';

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductDetail.css";

const products = {
    1: {
        id: 1,
        image: "/images/iphone16promax.png",
        name: "Iphone 16 Pro Max",
        price: "46.999.000₫",
        rating: 4.8,
        sold: "60,1k",
        description: "Điện thoại cao cấp với màn hình lớn và nhiều tính năng vượt trội."
    },
    // Thêm dữ liệu cho các sản phẩm khác nếu cần
};

export default function ProductDetail() {
    const { productId } = useParams();
    const product = products[productId];

    if (!product) {
        return <p>Sản phẩm không tồn tại.</p>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <Link to="/" className="back-button">← Trở về trang chủ</Link>
                <div className="product-detail">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">{product.price}</p>
                        <p className="product-rating">⭐ {product.rating} | Đã bán {product.sold}</p>
                        <p className="product-description">{product.description}</p>
                        <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
