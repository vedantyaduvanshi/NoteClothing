const express = require("express");
const {createNewItem,getAllItems,getSpecificProduct,AddToCart,FinalBill,ModifiedBill,likePost,order,validateorder} = require("../controllers/item");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/createNewItem", createNewItem);
router.get("/getAllItems", getAllItems);
router.get("/product/:productid", getSpecificProduct);
router.put("/product/:productid",authUser, AddToCart);
router.get("/FinalBill",authUser, FinalBill);
router.put("/ModifiedBill",authUser, ModifiedBill);

router.put("/likepost",authUser,likePost);


router.post("/order",authUser,order);
router.post("/order/validate",authUser,validateorder);


module.exports = router;
