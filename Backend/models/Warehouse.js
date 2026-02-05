const mongoose = require("mongoose")
const warehouseSchema = new mongoose.Schema({
    store_name:{type:String,required:true},
    code:{type:String, required:true},
    address:{type:String, required:true},
    state_code:{type:String},
    contact:{type:String},
    phone:{type:Number},
    email:{type:String},
    status: { type: Boolean, default:true},
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:false},
    created_by_name:{type:String},
    created_by_role:{type:String,required:true},
    updated_by:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    updated_by_name:{type:String},
    updated_by_role:String,
    updatedAt:Date,
    history:{oldValue:String,newValue:String}
},
{timestamps:true})

module.exports = new mongoose.model("Warehouse",warehouseSchema)