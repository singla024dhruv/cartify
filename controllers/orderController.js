// controllers/orderController.js
const Order = require("../models/order");
const Cart = require("../models/cart"); // Assuming Cart model exists and is related to the user

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { cartId } = req.body; // Assume cartId is passed
    const cart = await Cart.findById(cartId);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }

    let totalPrice = 0;
    const items = cart.items.map((item) => {
      totalPrice += item.product.price * item.quantity;
      return {
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // Create order
    const order = new Order({
      user: req.user._id, // Assuming user is authenticated and attached to req.user
      items,
      totalPrice,
    });

    await order.save();

    // Clear the cart after the order is placed
    cart.items = [];
    await cart.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all orders of a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "items.product"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // Status should be 'completed' or 'shipped'
    if (!["completed", "shipped"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
