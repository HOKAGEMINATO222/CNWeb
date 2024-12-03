import React, { useEffect, useContext, useState, useMemo } from 'react';
import CartContext from '../../components/CartContext/CartContext';
import './Checkout.css';
import apiService from '../../api/api';

const Checkout = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiService.getUserProfile();
                if (response.data && response.data.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Failed to fetch user info', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserOrders = async () => {
            if (user && user._id) {
                try {
                    const response = await apiService.getUserOrders(user._id);
                    if (response.data) {
                        setUserOrders(response.data.orders);
                    }
                } catch (error) {
                    console.error('Failed to fetch user orders', error);
                }
            }
        };

        fetchUserOrders();
    }, [user]);


    const { cart, selectedItems } = useContext(CartContext);
    const [recipientName, setRecipientName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPaymentOptionsVisible, setIsPaymentOptionsVisible] = useState(false);
    const orderDate = new Date();

    const selectedProducts = useMemo(() => {
        const selectedSet = new Set(selectedItems);
        return cart ? cart.filter(item => selectedSet.has(item.id)) : [];
    }, [cart, selectedItems]);

    const formatPrice = (price) => {
        return price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A';
    };

    // Hàm tính tổng số lượng sản phẩm
    const calculateTotalQuantity = () => {
        return userOrders.reduce((total, item) => total + item.quantity, 0);
    };

    // Hàm tính tổng giá trị của các sản phẩm
    const calculateTotalPrice = () => {
        return userOrders.reduce((total, item) => {
            return total + (Number(item.totalAmount) * item.quantity);
        }, 0);
    };



    const calculateEstimatedDeliveryDate = (days) => {
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + days);
        return deliveryDate.toLocaleDateString('vi-VN');
    };

    const handlePaymentClick = () => {
        setIsPaymentOptionsVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var ids = [];
        var numbers = [];

        selectedProducts.forEach((item) => {
            ids.push(item.selectedVariant.id);
            numbers.push(item.quantity);
        });

        // try {
        //     const orderInfo = await AllApi.addOrder(ids, numbers);
        //     const response = await AllApi.checkout(calculateTotalPrice, recipientName + " mua hang", orderInfo.data.maDonHang);
        //     window.location.href = response.data;
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            // Gọi API để hủy đơn hàng (ví dụ: apiService.cancelOrder(orderId))
            const response = await apiService.cancelOrder(orderId);
            if (response.data.success) {
                // Cập nhật lại danh sách đơn hàng sau khi hủy thành công
                setUserOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
                alert('Hủy đơn hàng thành công!');
            } else {
                alert('Hủy đơn hàng thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi hủy đơn hàng', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };


    const handleCODPayment = async (e) => {
        e.preventDefault();
        var ids = [];
        var numbers = [];

        selectedProducts.forEach((item) => {
            ids.push(item.selectedVariant.id);
            numbers.push(item.quantity);
        });
        // try {
        //     await AllApi.addOrder(ids, numbers);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    // Conditional rendering for loading and user data
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Không có thông tin người dùng. Vui lòng đăng nhập.</div>;
    }

    const getStatusCardStyle = (status) => {
        switch (status) {
            case 'Processing':
                return { backgroundColor: '#f9c74f', color: '#fff', padding: '10px', borderRadius: '5px' };
            case 'Shipped':
                return { backgroundColor: '#4dabf7', color: '#fff', padding: '10px', borderRadius: '5px' };
            case 'Delivered':
                return { backgroundColor: '#43a047', color: '#fff', padding: '10px', borderRadius: '5px' };
            case 'Cancelled':
                return { backgroundColor: '#f44336', color: '#fff', padding: '10px', borderRadius: '5px' };
            default:
                return { backgroundColor: '#bdbdbd', color: '#fff', padding: '10px', borderRadius: '5px' };
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Processing':
                return 'Đang xử lý';
            case 'Shipped':
                return 'Đã giao hàng';
            case 'Delivered':
                return 'Đã nhận hàng';
            case 'Cancelled':
                return 'Đã hủy';
            default:
                return 'Trạng thái không xác định';
        }
    };

    return (
        <div className="checkout-container">
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <h1>Thông tin đơn hàng</h1>
            </div>
            <div className="checkout-page">
                <form onSubmit={handleSubmit}>
                    <h3>Thông tin người nhận hàng:</h3>
                    {isLoggedIn ? (
                        <div className="receiver-inf">
                            <div className="form-group">
                                <div className='form-group-inf'>
                                    <label>Tên người nhận:</label>
                                    <div>{user.userName || recipientName}</div> {/* Display name as non-editable */}
                                </div>
                                <div className="form-group-inf">
                                    <label>Số điện thoại người nhận:</label>
                                    <div>{user.phoneNumber || phoneNumber}</div> {/* Display phone number as non-editable */}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-inf-address">
                                    <label htmlFor="address">Địa chỉ nhận hàng:</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={user.diaChi || address} // Editable address field
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="receiver-inf">
                            <p>Vui lòng đăng nhập để tự động điền thông tin người nhận.</p>
                        </div>
                    )}

                    <h3>Đơn hàng của bạn:</h3>
                    <div className="checkout-items">
                        {userOrders.map((item) => (
                            <div key={item._id} className="checkout-item-wrapper">
                                <div className="checkout-item">
                                    <div className="checkout-item-details">
                                        {item.items.map((productItem, index) => (
                                            <div key={index} className="product-details">
                                                <h2>{productItem.productId.name}</h2>
                                                <p className="item-price">Giá: {formatPrice(productItem.productId.price)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <h4>Tổng tiền: {formatPrice(item.totalAmount)}</h4>
                                    </div>
                                    <div className="date-form">
                                        <div className="date-inf" style={{ marginTop: '10px' }}>
                                            <p>Ngày đặt hàng: {new Date(item.updatedAt).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                        <div className="date-inf">
                                            <p>Ngày nhận hàng dự kiến: {calculateEstimatedDeliveryDate(3)} đến {calculateEstimatedDeliveryDate(7)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Status Card */}
                                <div className="order-status-card" style={getStatusCardStyle(item.orderStatus)}>
                                    <p>{getStatusText(item.orderStatus)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
