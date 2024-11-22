const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const VariantModel = require('../models/VariantModel');

const createOrder = async (req, res) => {
  const { OrderID, CustomerName, CustomerAddress, CustomerPhone, Details } = req.body;

  try {
    let totalAmount = 0;

    // Validate and calculate totals for order details
    for (const detail of Details) {
      const variant = await VariantModel.findById(detail.VariantId);

      if (!variant || variant.availableStock < detail.Amount) {
        return res.status(400).json({ message: `Variant ${variant?.name || detail.VariantId} is unavailable or insufficient stock` });
      }

      totalAmount += detail.Amount * variant.price;

      // Update stock
      variant.availableStock -= detail.Amount;
      await variant.save();
    }

    // Create new order
    const newOrder = new Order({
      OrderID,
      CustomerName,
      CustomerAddress,
      CustomerPhone,
      Total: totalAmount,
      Details
    });
    await newOrder.save();

    // Save order details
    for (const detail of Details) {
      const orderDetail = new OrderDetail({
        VariantId: detail.VariantId,
        OrderID: newOrder._id,
        SoLuong: detail.Amount,
        Total: detail.Amount * (await VariantModel.findById(detail.VariantId)).price,
        GiamGia: detail.GiamGia || 0
      });
      await orderDetail.save();
    }

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

module.exports = { createOrder };
