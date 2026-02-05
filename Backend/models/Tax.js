const mongoose = require("mongoose");
const taxSchema = new mongoose.Schema({
    name:{type:String,required:true},
    cgst_percent:{type:Number},
    sgst_percent:{type:Number},
    igst_percent:{type:Number},
    cess_percent:{type:Number},
    is_inclusive: { type: Boolean,default:false},
    created_by:{ type:mongoose.Schema.Types.ObjectId,ref:"User",required:false,},
    created_by_name: { type: String },
    created_by_role:{type:String,required:true},
    updated_by:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    updated_by_name:{type:String},
    updated_by_role:String,
    updatedAt:Date,
     history: {
    oldValue: String,
    newValue: String
  },
},
 { timestamps: true }
)
module.exports = mongoose.model("Tax",taxSchema)