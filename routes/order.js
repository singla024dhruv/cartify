// routes/order.js
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const orderController = require("../controllers/orderController");

// Create an order
router.post("/create", isAuthenticated, orderController.createOrder);

// Get all orders of a user
router.get("/user", isAuthenticated, orderController.getUserOrders);

// Get a single order by ID
router.get("/:orderId", isAuthenticated, orderController.getOrder);

// Admin route to update order status
router.put(
  "/:orderId/status",
  isAuthenticated,isAdmin,
  orderController.updateOrderStatus
);

module.exports = router;
