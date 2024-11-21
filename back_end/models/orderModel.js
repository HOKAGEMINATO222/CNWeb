const mongoose = require('mongoose');
 
const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variant: { type: mongoose.Schema.Types.Mixed, required: true }, // Dùng để lưu thông tin biến thể (nếu có)
    quantity: { type: Number, required: true },
    price: { type: Number, required: true } // Giá tại thời điểm đặt hàng
});
 
const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'Cash on Delivery'], required: true },
    orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
 
const OrderModel = mongoose.model('Order', orderSchema, 'orders');
 
module.exports = OrderModel;