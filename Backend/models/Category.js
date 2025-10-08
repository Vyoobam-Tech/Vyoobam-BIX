const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    parental_id:{type:String},
    name:{type:String,required:true},
    subcategory:{type:String,default:""},
    code:{type:String,required:true},
    // brand:{type:String},
    brands: [{type:String}],
    status:{type:Boolean,default:true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
