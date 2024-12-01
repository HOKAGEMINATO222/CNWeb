const ProductModel = require('../models/productModel');
const { validateProduct } = require('../validation/product');

// Example route to create a new product
const createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      details: error.details
    });
  }

  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error saving product', error: err.message });
  }
};

// Route to get all products
const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ProductModel.find();

    // Return the products in the response
    res.status(200).json({ 
      message: 'Products fetched successfully', 
      products 
    });
  } catch (err) {
    // Handle errors and send a response with status 500
    res.status(500).json({ 
      message: 'Error fetching products', 
      error: err.message 
    });
  }
};

// get product by id
const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ 
      message: 'Product details fetched successfully', 
      product 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error fetching product details', 
      error: err.message 
    });
  }
};


module.exports = {createProduct, getProducts, getProductById };