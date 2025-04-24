// routes/cart.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const  isAuthenticated  = require("../middlewares/auth");


router.get("/", isAuthenticated,cartController.getCart);
router.post("/add", isAuthenticated,cartController.addToCart);
router.post("/remove",isAuthenticated, cartController.removeFromCart);

module.exports = router;
