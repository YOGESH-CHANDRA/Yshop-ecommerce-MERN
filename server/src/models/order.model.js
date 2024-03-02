const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    custId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },
    items: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    shippingAddress:{
      type:String,
      required:true
    },
    deliveryStatus: {
      type: String,
      enum: ["underprocess", "shipped", "delivered", "canceled"],
      default: "underprocess"
    }
    
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
