import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import apiInstance from "../../api/api"; // Adjust the path to your API service
import "./CartPage.css";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userID");

    useEffect(() => {
        const fetchCartItemsWithNames = async () => {
            setLoading(true);
            try {
                const response = await apiInstance.getCart();
                const cartItems = response.data.cart.items || [];

                const itemsWithNames = await Promise.all(
                    cartItems.map(async (item) => {
                        const productResponse = await apiInstance.getProductById(item.productId);
                        return {
                            ...item,
                            productName: productResponse.data.name,
                        };
                    })
                );

                setCartItems(itemsWithNames);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCartItemsWithNames();
    }, []);

    const handleQuantityChange = async (id, variantColor, value) => {
        try {
            const updatedItem = cartItems.find(
                (item) => item.productId === id && item.variant.color === variantColor
            );
            const newQuantity = Math.max(1, updatedItem.quantity + value);
            await apiInstance.updateCartQuantity(id, variantColor, newQuantity);

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.productId === id && item.variant.color === variantColor
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveItem = async (id, variantColor) => {
        try {
            await apiInstance.removeProductFromCart(id, variantColor);
            setCartItems((prevItems) =>
                prevItems.filter((item) => !(item.productId === id && item.variant.color === variantColor))
            );
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleToggleSelect = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    const handleRemoveAll = async () => {
        try {
            await apiInstance.clearCart();
            setCartItems([]);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const handleAddComment = async (productId, commentText) => {
        try {
            await apiInstance.addComment({
                productId,
                userId, 
                text: commentText,
            });
            alert("Comment added successfully!");
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment.");
        }
    };
    
    // Function to add a rating
    const handleAddRating = async (productId, ratingValue) => {
        try {
            await apiInstance.addRating({
                productId,
                userId,
                rating: ratingValue,
            });
            alert("Rating added successfully!");
        } catch (error) {
            console.error("Error adding rating:", error);
            alert("Failed to add rating.");
        }
    };

    const handleCheckout = async () => {
        const selectedItems = cartItems.filter((item) => item.selected); // Filter selected items
    
        if (selectedItems.length === 0) {
            alert("No items selected for checkout.");
            return;
        }
    
        const orderData = {
            userId,
            items: selectedItems.map(item => ({
                productId: item.productId,
                variant: item.variant,
                quantity: item.quantity,
                price: item.variant.sale, // Use sale price for the order
            })),
            totalAmount, 
            paymentMethod: "Cash on Delivery", // Example payment method
        };
    
        try {
            const response = await apiInstance.createOrder(orderData);
            if (response.data) {
                alert("Order created successfully!");
                // Optional: Remove selected items from the cart or navigate
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order.");
        }
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + (item.selected ? item.variant.sale * item.quantity : 0),
        0
    );

    if (loading) return <div>Loading cart...</div>;

    return (
        <div className="cart-page">
            <h1>Giỏ hàng của bạn</h1>
            <div className="total-product-cart">
                {cartItems.length === 0 ? (
                    <div className="Empty-cart">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faCartShopping} flip="horizontal" size="6x" color="red" />
                        </div>
                        <p>Giỏ hàng của bạn trống</p>
                        <Link to="/">
                            <button className="btn-go-home">Tiếp tục mua sắm</button>
                        </Link>
                    </div>
                ) : (
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className="cart-item-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={item.selected}
                                        onChange={() => handleToggleSelect(item._id)}
                                    />
                                </div>

                                <div className="cart-item-info">
                                    <img src={item.variant?.image || "defaultImage.jpg"} alt={item.productName} />
                                    <div className="cart-item-details">
                                        <h2>{item.productName}</h2>
                                        <p>Màu sắc: {item.variant.color || 'N/A'}</p>
                                        <p>Giá: {item.variant.sale.toLocaleString()}₫</p>
                                    </div>
                                </div>

                                <div className="price-details">
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item.productId, item.variant.color, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.productId, item.variant.color, 1)}>+</button>
                                    </div>
                                    <button className="delete-product" onClick={() => handleRemoveItem(item.productId, item.variant.color)}>Xóa</button>
                                </div>
                            </div>
                        ))}
                        <div className="bottom-order">
                            <Link to="/">
                                <button>Chọn thêm sản phẩm</button>
                            </Link>
                            <button onClick={handleCheckout}>Tới trang thanh toán</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
