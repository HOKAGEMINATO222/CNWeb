const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  OrderID: { type: Number, required: true, unique: true },
  CustomerName: { type: String, required: true },
  CustomerAddress: { type: String, required: true },
  CustomerPhone: { type: String, required: true },
  Total: { type: Number, required: true },
  Discount: { type: Number, default: 0 },
  OrderDate: { type: Date, default: Date.now },
  Details: [
    {
      VariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariantModel', required: true },
      Amount: { type: Number, required: true },
      Total: { type: Number, required: true }
    }
  ]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Order', OrderSchema, 'Order');
