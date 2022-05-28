const express = require("express");
const router = express.Router();

const { addOrder, displayOrders } = require("../../controller/order");
const { ADD, HISTORY } = require("../../utils/config").ROUTES.ORDER;

router.post(ADD, addOrder);
router.get(HISTORY, displayOrders);

module.exports = router;
