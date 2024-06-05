const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    availability: [
      {
        color: {
          type: String,
        },
        sizes: {
          xsSize: {
            type: Number,
          },
          sSize: {
            type: Number,
          },
          mSize: {
            type: Number,
          },
          lSize: {
            type: Number,
          },
        },
      },
    ],
    images:[
      {
        color: {
          type: String,
        },
        images: {
          type: Array,
        },
      },
    ],
    reviews: [
      {
        type: Array,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
