const express = require('express');
const { getProducts, getProductById, getRelatedProducts} = require('../controllers/productController');

const router = express.Router();
    
router.get('/', getProducts);

router.get('/:productId', getProductById);

// API lấy sản phẩm liên quan
router.get('/:productId/related', getRelatedProducts);

module.exports = router;