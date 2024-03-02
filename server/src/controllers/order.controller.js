const OrderModel = require("../models/order.model");

// all user order status.
const orders = async (req, res) => {
  const { isAdmin, id } = req.user;

  try {
    if (isAdmin == "true") {
      const orders = await OrderModel.find({});
      // console.log(orders);
      return res.status(200).json(orders);
    }
    const orders = await OrderModel.find({ _id: id });
    // console.log(orders);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// order status by userId
const ordersByUser = async (req, res) => {
  const { id } = req.user;

  try {
    const orders = await OrderModel.find({ custId: id });
    // console.log(orders);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// add order details in database
const createOrder = async (req, res) => {
  req.body.custId = req.user.id;
  // console.log(req.body);

  const orderId = req.body.orderId;
  try {
    const existOrder = await OrderModel.findOne({ orderId });
    if (existOrder) {
      return res.json({ msg: "order details already saved" });
    }
    const order = await OrderModel.create(req.body);
    // console.log(order);
    return res.status(201).json({ msg: "Order details save in data base" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// update the order delivery status
const updateOrder = async (req, res) => {
  const { orderId, status } = req.body;
  const { isAdmin, id } = req.user;
  // console.log(orderId, status);
  try {
    if (isAdmin == "true") {
      const isOrder = await OrderModel.find({ orderId });
      if (!isOrder) {
        return res.status(404).json({ msg: "order is not found" });
      }
      const updatedOrderStatus = await OrderModel.findOneAndUpdate(
        { orderId },
        { deliveryStatus: status },
        { new: true }
      );
      return res.status(200).json({
        msg: "deliveryStatus updated successfully",
        updatedOrderStatus,
      });
    }

    const isOrder = await OrderModel.find({
      $and: [{ orderId }, { custId: id }],
    });
    // console.log("login", isOrder);
    if (!isOrder) {
      return res.status(404).json({ msg: "order is not found" });
    }
    const updatedOrderStatus = await OrderModel.findOneAndUpdate(
      { $and: [{ orderId }, { custId: id }] },
      { deliveryStatus: status },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "deliveryStatus updated successfully", updatedOrderStatus });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { ordersByUser, orders, createOrder, updateOrder };
