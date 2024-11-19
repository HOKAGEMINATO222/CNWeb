// productValidation.js
const Joi = require('joi');

// Schema for Variant Input
const variantSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  availableStock: Joi.number().integer().min(0).required()
});

// Schema for Product Model
const productSchema = Joi.object({
  TenHangHoa: Joi.string().required(),
  LoaiHangHoa: Joi.string().required(),
  HangSanXuat: Joi.array().items(Joi.string()).required(),
  ThongTin: Joi.array().items(Joi.string()).required(),
  ThongSo: Joi.array().items(Joi.string()).required(),
  Gia: Joi.number().required(),
  Star5: Joi.number().integer().min(0).default(0),
  Star4: Joi.number().integer().min(0).default(0),
  Star3: Joi.number().integer().min(0).default(0),
  Star2: Joi.number().integer().min(0).default(0),
  Star1: Joi.number().integer().min(0).default(0),
  Variants: Joi.array().items(variantSchema).required()
});

// Validation function
const validateProduct = (product) => {
  return productSchema.validate(product, { abortEarly: false });
};

module.exports = {validateProduct};
