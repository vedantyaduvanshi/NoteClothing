const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;


const codeSchema = new mongoose.Schema({
    emailCode:{
        type: String,
    },

    resetpass:{
        type: String,
    },
    user:{
        type: ObjectId,
        ref: "User", 
        required: true,
    },
});

module.exports = mongoose.model("Code", codeSchema);
