const Item = require("../models/Item");

const User = require("../models/User");

const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config()
const crypto = require("crypto");
const Order = require("../models/Order");
const generateCode = require("../helpers/generateCode");

exports.createNewItem = async (req, res) => {
  try {
    console.log(req);
    const item = await new Item(req.body).save();
    res.json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const Items = await Item.find();
    res.json(Items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getSpecificProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    const certainProduct = await Item.findOne({ _id: productid });
    if (!certainProduct) {
      return res.json({ ok: false });
    }
    res.json(certainProduct);
  } catch (error) {
    return res.json({ ok: false });
  }
};

exports.AddToCart = async (req, res) => {
  try {
    const userofNote = await User.findById(req.user.id);

    const { productid } = req.params;

    if (productid === req.body.ItemId) {
      const item = req.body;

      await userofNote.updateOne({
        $push: { Cart: item },
      });
      res.json({ message: "Added to Cart" });
    } else {
      return res.status(400).json({ message: "Error" });
    }
  } catch (error) {
    return res.json({ ok: false });
  }
};

exports.FinalBill = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let totalBill = 0;

    user.Cart.forEach((item) => {
      totalBill += item.price * item.AmountSelection;
    });

    res.json(totalBill);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.ModifiedBill = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.user.id);

    const itemNum = req.body.num;
    const itemInCart = user.Cart.find((item) => item.num === itemNum);

    if (req.body.defineAction === "delete") {
      await user.updateOne({
        $pull: { Cart: { num: req.body.num } },
      });
    }

    if (req.body.defineAction === "add" && itemInCart.AmountSelection < 5) {
      await user.updateOne(
        {
          $inc: { "Cart.$[elem].AmountSelection": 1 },
        },
        {
          arrayFilters: [{ "elem.num": itemNum }],
          new: true,
        }
      );
    }

    if (req.body.defineAction === "minus" && itemInCart.AmountSelection >= 1) {
      await user.updateOne(
        {
          $inc: { "Cart.$[elem].AmountSelection": -1 },
        },
        {
          arrayFilters: [{ "elem.num": itemNum }],
          new: true,
        }
      );
    }

    const updatedUser = await User.findById(req.user.id);
    let totalBill = 0;

    updatedUser.Cart.forEach((item) => {
      totalBill += item.price * item.AmountSelection;
    });

    res.json(totalBill);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const sender = await User.findById(req.user.id);

    const IdOfItem = req.body.ItemId;

    if (sender.likeItems.includes(IdOfItem)) {
      await sender.updateOne({
        $pull: { likeItems: IdOfItem },
      });
      res.json({ message: "Unliked" });
    } else if (!sender.likeItems.includes(IdOfItem)) {
      await sender.updateOne({
        $push: { likeItems: IdOfItem },
      });
      res.json({ message: "Liked" });
    } else {
      return res.status(400).json({ message: "Error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.order = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const user = await User.findById(req.user.id);
    let totalBill = 0;

    user.Cart.forEach((item) => {
      totalBill += item.price * item.AmountSelection;
    });

    if (totalBill < 1999) {
        totalBill = totalBill + 225
    }

    if (req.body.Bill === totalBill) {
      const finalAmount = totalBill*100
  
      const order = await razorpay.orders.create({
          amount: finalAmount,
          currency: "INR",
          })
  
      if (!order) {
        return res.status(500).send("Error");
      }
  
      res.json(order);
      
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.validateorder = async (req, res) => {
    try {
       const user = await User.findById(req.user.id);
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature,FinalOrderCart,FinalBill,Number} = req.body

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        if (digest !== razorpay_signature) {
           await user.updateOne({ $set: { Cart: [] } });
           return res.status(400).json({ message: "Transaction seems fake." });
        }else if(digest === razorpay_signature){
          const code = generateCode(5);
          const NewOrder = await new Order({
            CurrentStatus:"Ordered",
            orderId: code,
            FinalAmountPaid:FinalBill,
            user:user._id,  
            phoneNumber:Number,
            OrderedItems:FinalOrderCart,
            Address:user.details.AddressLine1 + user.details.AddressLine2 + user.details.City + user.details.Pincode + user.details.State,
           }).save();
           await user.updateOne({ $push: { Orders: NewOrder._id }, $set: { Cart: [] } });
          res.json({ message: "Success",order:NewOrder})
        }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  