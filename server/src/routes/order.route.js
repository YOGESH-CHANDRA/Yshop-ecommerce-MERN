const express = require("express");
const {
  orders,
  createOrder,
  updateOrder,
  ordersByUser,
} = require("../controllers/order.controller");

const Auth = require("../middleware/Auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(Auth, orders)
  .post(Auth, createOrder)
  .patch(Auth, updateOrder);

router.route("/:orderId").get(Auth, ordersByUser).patch(Auth, updateOrder);

router.route("/user").get(Auth, ordersByUser);

module.exports = router;
