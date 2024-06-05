const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const { sendResetCode } = require("../helpers/mailer");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const generateCode  = require("../helpers/generateCode");
const Code = require("../models/Code");
const { sendVerificationMail } = require("../helpers/sendVerificationMail");
const { sendresetpass } = require("../helpers/sendresetpass");
// const generateCode  = require("../helpers/generateCode");
// const { ProfilingLevel } = require("mongodb");
// const { default: mongoose } = require("mongoose");
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    console.log(req.body)

    const checkemail = await User.findOne({ email });

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address.",
      });
    } else if (checkemail) {
      return res.status(400).json({
        message: "Email Address already in use.",
      });
    } else if (!validateLength(first_name, 4, 22)) {
      return res.status(400).json({
        message: "First Name must contain 4-22 characters.",
      });
    }else if (!validateLength(last_name, 2, 22)) {
      return res.status(400).json({
        message: "Last Name must contain 2-22 characters.",
      });
    } else if (!validateLength(password, 9, 45)) {
      return res.status(400).json({
        message: "Password must be atleast 9 characters",
      });
    } else {
      const cryptedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        first_name,
        last_name,
        email,
        password: cryptedPassword,
      }).save();
      const code = generateCode(5);
      const savedCode = await new Code({
       emailCode:code,
       user:user._id,
      }).save();
      sendVerificationMail(user.email,user.first_name,code);
      const token = generateToken({ id: user._id.toString() }, "5d");
      res.send({
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        first_name: user.first_name,
        last_name: user.last_name,
        token: token,
        verified: user.verified,
        message: "Done! Please check your inbox to activate your account.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.login = async (req, res) => {
  try {
   const {email, password} = req.body;
   const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({message:"Email address not registered."});
   } 
   const checkPasswordCorrectorNot = await bcrypt.compare(password, user.password);
   if(!checkPasswordCorrectorNot){
    return res.status(400).json({message:"Incorrect email or password."});
   }
   const token = generateToken({ id: user._id.toString() }, "7d");
   res.send({
     id: user._id,
     email: user.email,
     createdAt: user.createdAt,
     first_name: user.first_name,
     last_name: user.last_name,
     token: token,
     verified: user.verified,
   });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProfile = async (req,res)=>{
  try {
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
      return res.json({ok: false});
    }
    res.json({ ...user.toObject()})
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.ActivateAcc = async (req,res)=>{
  console.log(req.body)
  try {
    const {email, code} = req.body;
    const user = await User.findOne({email});
    const Dbcode = await Code.findOne({user:user._id});
    if(Dbcode.emailCode !== code){
    return res.status(400).json({message:"Incorrect Code."});
    }else if(Dbcode.emailCode === code){
      await User.findByIdAndUpdate(user.id, { verified: true });
      await Code.deleteOne({ _id: Dbcode._id });
      return res
        .status(200)
        .json({ message: "You have successfully verified your account." });
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.updatedetails = async (req,res)=> {
  try {
    const {Infos} = req.body;
    const updated = await User.findByIdAndUpdate(req.user.id, {
      details: Infos,
    },
    {
      new: true,
    });
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


exports.UpdateInformation = async (req,res)=> {
  try {
    const {firstname,lastname,gender} = req.body;
    const updated = await User.findByIdAndUpdate(req.user.id, {
      first_name: firstname,
      last_name:lastname,
      gender:gender
    },
    {
      new: true,
    });
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.changePass = async (req,res)=> {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user){
      const code = generateCode(5);
      const updated = await Code.findByIdAndUpdate(user.id, {
        resetpass:code
      },
      {
        new: true,
      });
      sendresetpass(user.email,code);
      res.json({success: "Reset code sent"});
    }else{
      res.json({error: "Cannot find account"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}