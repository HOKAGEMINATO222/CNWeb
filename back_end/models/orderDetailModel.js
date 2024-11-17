const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  VariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariantModel', required: true },
  OrderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  SoLuong: { type: Number, required: true },
  Total: { type: Number, required: true },
  GiamGia: { type: Number, default: 0 }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('OrderDetail', OrderDetailSchema, 'OrderDetail');
