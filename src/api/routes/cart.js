const express = require("express");
const router = express.Router();

const { addToCart, displayCart, updateCart, deleteFromCart } = require("../../controller/cart");
const { ADD, DISPLAY, UPDATE, REMOVE } = require("../../utils/config").ROUTES.CART;

router.post(ADD, addToCart);
router.get(DISPLAY, displayCart);
router.post(UPDATE, updateCart);
router.post(REMOVE, deleteFromCart);

module.exports = router;
