import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Điện thoại iPhone 13 Pro Max",
            price: 30000000,
            quantity: 1,
            selected: false,
        },
        {
            id: 2,
            name: "Laptop Dell XPS 15",
            price: 50000000,
            quantity: 1,
            selected: false,
        },
        {
            id: 3,
            name: "Tai nghe Sony WH-1000XM4",
            price: 8000000,
            quantity: 1,
            selected: false,
        },
    ]);

    const handleQuantityChange = (id, value) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item
            )
        );
    };

    const handleToggleSelect = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    const handleRemoveAll = () => {
        setCartItems([]);
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + (item.selected ? item.price * item.quantity : 0),
        0
    );

    return (
        <div className="cart-container">
            {/* Thanh tiêu đề chứa TECH STORE và Giỏ Hàng */}
            <div className="cart-header-bar">
                <div className="header-left">
                    <Link to="/" className="tech-store-link">TECH STORE</Link>
                    <span className="cart-title">Giỏ Hàng</span>
                </div>
                <div className="header-right">
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." className="search-input" />
                    <button className="search-button">🔍</button>
                </div>
            </div>

            <div className="cart-table">
                <div className="cart-table-header">
                    <span></span> {/* Cột tickbox, bỏ tiêu đề */}
                    <span>Sản Phẩm</span>
                    <span>Đơn Giá</span>
                    <span>Số Lượng</span>
                    <span>Thành Tiền</span>
                </div>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-checkbox">
                            <input
                                type="checkbox"
                                checked={item.selected}
                                onChange={() => handleToggleSelect(item.id)}
                            />
                        </div>
                        <div className="cart-item-details">
                            <span className="cart-item-name">{item.name}</span>
                        </div>
                        <span className="cart-item-price">
                            {item.price.toLocaleString()}₫
                        </span>
                        <div className="cart-item-quantity">
                            <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                        </div>
                        <span className="cart-item-total">
                            {(item.price * item.quantity).toLocaleString()}₫
                        </span>
                    </div>
                ))}
            </div>
            <div className="cart-footer">
                <button onClick={handleRemoveAll} className="remove-all-button">Xóa Tất Cả</button>
                <div className="total-amount">
                    <span>Tổng thanh toán ({cartItems.filter(item => item.selected).length} sản phẩm): {totalAmount.toLocaleString()}₫</span>
                </div>
                <button className="checkout-button">Mua Hàng</button>
            </div>
        </div>
    );
}
