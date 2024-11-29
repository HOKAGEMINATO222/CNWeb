import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./CheckoutPage.css";
import { Col } from 'antd';

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Mock dữ liệu người dùng - thay bằng API hoặc context thực tế
    const user = {
        address: "123 Đường ABC, Quận 1, TP.HCM",
        email: "user@example.com",
        phone: "0123456789",
    };

    // Lấy danh sách sản phẩm được chọn từ giỏ hàng (truyền qua state)
    const selectedItems = location.state?.selectedItems || [];

    const totalAmount = selectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handlePayment = () => {
        alert(`Đơn hàng đã được đặt thành công. Vui lòng kiểm tra email: ${user.email} để xác nhận thông tin.`);
        navigate("/"); // Chuyển hướng về trang chủ sau khi đặt hàng
    };

    const handleBackToCart = () => {
        navigate("/cart"); // Chuyển hướng về trang giỏ hàng
    };

    return (
        <div>
            <div className="checkout-header-bar">
                <div className="header-left">
                    <Link to="/" className="tech-store-link">TECH STORE</Link>
                    <span className="checkout-title">Trang thanh toán</span>
                </div>
                <div className="header-right">
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." className="search-input" />
                    <button className="search-button">🔍</button>
                </div>
            </div>

            <div className="checkout-container">

                {/* Hiển thị danh sách sản phẩm */}
                <div className="checkout-items">
                    {selectedItems.map((item) => (
                        <div key={item.id} className="checkout-item">

                            <div className="left">
                                <img src={item.image} alt={item.name} className="item-image" />
                            </div>

                            <div className="item-info-middle">
                                <div className="middle-left">
                                    <div className="item-name">{item.name}</div>
                                </div>
                                <div className="middle-right">
                                    <div className="item-quantity">Số lượng: {item.quantity}</div>
                                </div>
                                
                            </div>
                            <div className="right">
                                <div className="item-price">{(item.price * item.quantity).toLocaleString()}₫</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tổng tiền */}
                <div className="checkout-summary">
                    <span><strong>Tổng cộng:</strong> {totalAmount.toLocaleString()}₫</span>
                </div>

                {/* Thông tin người dùng */}
                <div className="user-info">
                    <h3>Thông tin người nhận</h3>
                    <p><strong>Địa chỉ:</strong> {user.address}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Số điện thoại:</strong> {user.phone}</p>
                </div>

                {/* Nút thanh toán */}
                <button className="pay-button" onClick={handlePayment}>
                    Thanh Toán
                </button>
            </div>
        </div>
    );
}
