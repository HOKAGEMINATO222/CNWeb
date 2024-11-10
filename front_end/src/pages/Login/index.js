import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./Login.css";
import { Link } from "react-router-dom";
// import AllApi from "../../api/api";
// import { AuthContext } from "../../components/AuthContext/AuthContext";

export default function LoginPage() {
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validatePhoneNumber = (phoneNumber) => {
        return /^(0)[3|5|7|8|9][0-9]{8}$/.test(phoneNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};

        if (!phonenumber) {
            errors.phonenumber = "Hãy nhập số điện thoại";
        } else if (!validatePhoneNumber(phonenumber)) {
            errors.phonenumber = "Hãy nhập số điện thoại hợp lệ!";
        }
        if (!password) {
            errors.password = "Hãy nhập mật khẩu!";
        }

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const user = {
            phoneNumber: phonenumber,
            password: password,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/login", // URL của API
                {
                  phoneNumber: user.phoneNumber,  // Số điện thoại của người dùng
                  password: user.password,        // Mật khẩu của người dùng
                },
                {
                  headers: {
                    "Content-Type": "application/json", 
                  },
                  withCredentials: true,  
                }
              );
              
              // Xử lý phản hồi
              console.log(response.data);
              
            // console.log(user.phoneNumber);
            // console.log(user.password);
            console.log(response.data.success);
            console.log(response.data);
            
            if (response.data.success) {
                if (response.data.role === "admin") {
                    // Lưu token vào localStorage
                    localStorage.setItem("authToken", response.data.token); 

                    // Cập nhật role vào localStorage 
                    localStorage.setItem("role", response.data.role);
                    
                    window.location.href = "/admin"; // Chuyển hướng đến trang admin
                } else {
                    window.location.href = "/"; // Chuyển hướng đến trang chủ
                }
            } else {
                const newErrors = { ...errors };
                if (response.data.message === "User not found") {
                    newErrors.phonenumber = "Số điện thoại chưa được đăng ký!";
                }
                if (response.data.message === "Invalid password") {
                    newErrors.password = "Mật khẩu không chính xác!";
                }
                setErrors(newErrors);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({ apiError: "Đã có lỗi xảy ra. Vui lòng thử lại sau." });
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <div className="title">Chào mừng quay lại với <span className="app-name">TECH STORE</span></div>
                <div className="subtitle">Đăng nhập vào tài khoản của bạn</div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div>
                            <label htmlFor="phonenumber">Số điện thoại</label>
                            <input type="text" id="phonenumber" onChange={(e) => setPhonenumber(e.target.value)} />
                        </div>
                        {errors.phonenumber && <div className="error">{errors.phonenumber}</div>}
                    </div>
                    <div className="input-container">
                        <div>
                            <label htmlFor="password">Mật khẩu</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className="signup-link">Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link></div>

                    <button className="button" type="submit">Đăng nhập</button>
                </form>
                {errors.apiError && <div className="error">{errors.apiError}</div>} {/* Hiển thị lỗi từ API */}
            </div>
        </div>
    );
}
