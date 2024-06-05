const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "first name is required"],
        trim: true,
        text: true
    },
    last_name: {
        type: String,
        required: [true, "last name is required"],
        trim: true,
        text: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],    
    },
    address: {
        type: String, 
    },
    verified: {
        type: Boolean,
        required: [true, "username is required"],
        default: false
    },
    likeItems:[
        {
            type:ObjectId,
            ref:"User",
        }
    ],
    Cart:
        {
            type:Array,
        },
    Orders:[
        {
            type:ObjectId,
            ref:"Order",
        }
    ],
    gender:{
        type: String
    },
    details: {
        AddressLine1:{
            type: String
        },
        AddressLine2:{
            type: String
        },
        City:{
            type: String
        },
        Pincode:{
            type: String
        },
        State:{
            type: String
        },
    },

}, {
    timestamps:true,
});


module.exports = mongoose.model('User', userSchema)