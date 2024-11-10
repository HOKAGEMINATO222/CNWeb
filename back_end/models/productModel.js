// productModel.js
const mongoose = require('mongoose');

const variantInputSchema = new mongoose.Schema({
    name: String,
    price: Number,
    availableStock: Number
});

const productSchema = new mongoose.Schema({
    TenHangHoa: {
        type: String,
        required: true
    },
    LoaiHangHoa: {
        type: String,
        required: true
    },
    HangSanXuat: {
        type: [String], // List of manufacturers
        required: true
    },
    ThongTin: {
        type: [String], // List of additional information
        required: true
    },
    ThongSo: {
        type: [String], // List of specifications
        required: true
    },
    Gia: {
        type: Number, // Price
        required: true
    },
    Star5: {
        type: Number,
        default: 0
    },
    Star4: {
        type: Number,
        default: 0
    },
    Star3: {
        type: Number,
        default: 0
    },
    Star2: {
        type: Number,
        default: 0
    },
    Star1: {
        type: Number,
        default: 0
    },
    Variants: {
        type: [variantInputSchema], // Array of variants
        required: true
    }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
