const express=require("express")
const {getStockAdjustment,addStockAdjustment, deleteStockAdjustment} = require('../controllers/stockAdjustment')
const {protect,authorize}=require("../middleware/auth")
const router=express.Router()
router.get("/",protect,authorize("super_admin","admin","user"),getStockAdjustment)
router.post("/",protect,authorize("super_admin","admin","user"),addStockAdjustment)
router.delete("/:id",protect,authorize("super_admin","admin"),deleteStockAdjustment)
module.exports=router