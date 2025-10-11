const express=require("express")
const {getPurchases,addPurchase, deletePurchase}=require("../controllers/purchaseController")
const {protect,authorize}=require("../middleware/auth")
const router=express.Router()
router.get("/",protect,authorize("super_admin","admin","user"),getPurchases)
router.post("/",protect,authorize("super_admin","admin"),addPurchase)
router.delete("/:id",protect,authorize("super_admin","admin"),deletePurchase)
module.exports = router