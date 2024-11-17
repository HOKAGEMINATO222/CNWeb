import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

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
        alert(`Đơn hàng đã được đặt thành công. Vui lòng check mail ${user.email} xác nhận thông tin.`);
        navigate("/"); // Chuyển hướng về trang chủ sau khi đặt hàng
    };

    const handleBackToCart = () => {
        navigate("/cart"); // Chuyển hướng về trang giỏ hàng
    };

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <button className="back-button" onClick={handleBackToCart}>
                    ← Quay lại giỏ hàng
                </button>
                <h2>Trang Thanh Toán</h2>
            </div>

            {/* Hiển thị danh sách sản phẩm */}
            <div className="checkout-items">
                {selectedItems.map((item) => (
                    <div key={item.id} className="checkout-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">{(item.price * item.quantity).toLocaleString()}₫</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tổng tiền */}
            <div className="checkout-summary">
                <span><strong>Tổng cộng:</strong> {totalAmount.toLocaleString()}₫</span>
            </div>

            {/* Phương thức thanh toán */}
            <div className="payment-method">
                <h3>Phương thức thanh toán</h3>
                <label>
                    <input type="radio" name="payment" defaultChecked />
                    Thanh toán tiền mặt sau khi nhận hàng
                </label>
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
    );
}
