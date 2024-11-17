const Joi = require('joi');

// Validation schema for order
const orderSchema = Joi.object({
  customerName: Joi.string().required(),
  customerAddress: Joi.string().required(),
  customerPhone: Joi.string().pattern(/^\d{10,11}$/).required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).required(),
  paymentMethod: Joi.string().valid('cash', 'card').required(),
  totalPrice: Joi.number().required()
});

// Validate order function
const validateOrder = (order) => {
  return orderSchema.validate(order, { abortEarly: false });
};

module.exports = { validateOrder };
