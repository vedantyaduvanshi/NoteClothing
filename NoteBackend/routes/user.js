const express = require("express");
const { register,
     login,
     getProfile,
     ActivateAcc,
     updatedetails,
     UpdateInformation,
     changePass,
    } = require("../controllers/user");
const { authUser } = require("../middleware/auth");
const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.get("/getProfile",authUser, getProfile);
router.post("/validateCode", ActivateAcc);
router.post("/changePass", changePass);
router.put("/updatedetails",authUser, updatedetails);
router.put("/udateinfo",authUser, UpdateInformation);




module.exports = router;
