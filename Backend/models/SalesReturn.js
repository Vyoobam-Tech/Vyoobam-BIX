
// // const mongoose = require("mongoose");

// // const salesReturnSchema = new mongoose.Schema(
// //   {
// //     customer_name: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     customer_phone: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     invoice_no: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     product_id: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Product",
// //       required: true,
// //     },
// //     quantity: {
// //       type: Number,
// //       required: true,
// //       min: 1,
// //     },
// //     reason: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     created_at: {
// //       type: Date,
// //       default: Date.now,
// //     },
// //     created_by: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //   },
// //   {
// //     timestamps: true, // Automatically adds createdAt and updatedAt
// //   }
// // );

// // module.exports = mongoose.model("SalesReturn", salesReturnSchema);
// const mongoose = require("mongoose");

// const salesReturnSchema = new mongoose.Schema(
//   {
//     invoice_no: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Sale",
//       required: true,
//     },
//     customer_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },
//     items: [
//       {
//         product_id: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//       },
//     ],
//     reason: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     created_by: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("SalesReturn", salesReturnSchema);
const mongoose = require("mongoose");

const salesReturnSchema = new mongoose.Schema(
  {
    invoice_no: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
      required: true,
    },

    invoice_number: {
      type: String, // snapshot
      required: true,
    },

    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    customer_name: {
      type: String, // snapshot
      required: true,
    },

    customer_phone: {
      type: String, // snapshot
    },

    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        product_name: {
          type: String, // snapshot
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        return_amount: {
          type: Number,
          required: true,
        },
      },
    ],

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    created_by_name: {
      type: String, // snapshot
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesReturn", salesReturnSchema);
