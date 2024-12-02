const express = require('express');
const { getProducts, getProductById, addReview, addComment} = require('../controllers/productController');

const router = express.Router();
    
router.get('/', getProducts);

router.get('/:productId', getProductById);

router.post('/:productId/review', addReview);

router.post('/:productId/comment', addComment);

module.exports = router;