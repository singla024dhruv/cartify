const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

// @desc   Get all products
// @route  GET /api/products
// @access Public
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc   Get single product by ID
// @route  GET /api/products/:id
// @access Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

// @desc   Create new product
// @route  POST /api/products
// @access Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category, imageUrl } = req.body;

  const product = new Product({
    name,
    description,
    price,
    stock,
    category,
    imageUrl,
  });
  const savedProduct = await product.save();

  res.status(201).json(savedProduct);
});

// @desc   Update product
// @route  PUT /api/products/:id
// @access Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedFields = req.body;
  Object.assign(product, updatedFields);

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

// @desc   Delete product
// @route  DELETE /api/products/:id
// @access Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted successfully" });
});
