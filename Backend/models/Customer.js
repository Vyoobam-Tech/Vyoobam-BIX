const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    gstin:{type:String},
    email:{type:String},
    billing_address:{type:String,required:true},
    shipping_address:{type:String},
    state_code:{type:String},
    credit_limit:{type:Number},
    opening_balance:{type:Number},
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:false},
    updated_by:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    updated_by_role:String,
    updatedAt:Date,
    history:{
        oldValue:String,
        newValue:String,
    }
},  { timestamps: true } 
)
module.exports = mongoose.model("Customer",customerSchema)