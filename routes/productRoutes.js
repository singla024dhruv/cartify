const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/auth");

// Public routes
router.get("/get", productController.getAllProducts);
router.get("/get/:id", productController.getProductById);

// Admin-only
router.post("/add", isAuthenticated, isAdmin, productController.createProduct);
router.put("/update/:id", isAuthenticated, isAdmin, productController.updateProduct);
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  productController.deleteProduct
);

module.exports = router;
