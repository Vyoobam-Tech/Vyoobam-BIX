const express = require("express");
const router = express.Router();
const {addSalesReturn,getSalesReturns,getSalesReturnById}= require('../controllers/salereturnController')
const { protect} = require("../middleware/auth")
router.post("/", protect,addSalesReturn);
router.get("/", protect, getSalesReturns);
router.get("/:id", protect, getSalesReturnById);
module.exports = router;
