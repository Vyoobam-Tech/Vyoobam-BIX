const mongoose = require("mongoose");
const googleCategorySchema = new mongoose.Schema({
  google_id: { type: Number, index: true },
  name: String,
  full_path: String,
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GoogleCategory",
    default: null,
  },
});

module.exports = mongoose.model("GoogleCategory", googleCategorySchema);
