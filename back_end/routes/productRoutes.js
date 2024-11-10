const express = require('express');
const { createProduct } = require('../controllers/productController');

const router = express.Router();

// POST route for creating a new product
router.post('/', createProduct);

module.exports = router;