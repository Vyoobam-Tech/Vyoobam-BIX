const mongoose = require("mongoose");
const taxSchema = new mongoose.Schema({
    name:{type:String,required:true},
    created_by_role:{type:String,required:true},
    cgst_percent:{type:Number},
    sgst_percent:{type:Number},
    igst_percent:{type:Number},
    cess_percent:{type:Number},
    is_inclusive: { type: Boolean,default:false},
},
 { timestamps: true }
)
module.exports = mongoose.model("Tax",taxSchema)