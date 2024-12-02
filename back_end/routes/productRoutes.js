const express = require('express');
const { getProducts, getProductById, addReview, getComments } = require('../controllers/productController');

const router = express.Router();
    
router.get('/', getProducts);

router.get('/:productId', getProductById);

router.post('/:productId/review', addReview);

router.get('/:productId/comments', getComments);

module.exports = router;