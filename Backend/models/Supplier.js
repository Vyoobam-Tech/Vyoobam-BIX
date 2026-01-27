const mongoose = require("mongoose")
const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_by_role: { type: String, required: true },

  phone: { type: String },     
  gstin: { type: String },     
  email: { type: String },
  address: { type: String },
  state_code: { type: String },

  opening_balance: { type: Number },

  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updated_by_role: String,
  updatedAt: Date,

  history: {
    oldValue: String,
    newValue: String,
  },
}, { timestamps: true });


module.exports = new mongoose.model("Supplier", supplierSchema)