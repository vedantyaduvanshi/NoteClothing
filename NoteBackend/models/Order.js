const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    FinalAmountPaid:{
      type: String,
      required: true,
    },
    OrderedItems: {
      type: Array,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    CurrentStatus: {
      type:String,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Order", orderSchema);
