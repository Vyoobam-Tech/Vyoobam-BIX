const express =require("express")
const {getSupplierPayments,addSupplierPayment, deletePayment}=require("../controllers/supplierpaymentController")
const {protect,authorize}=require("../middleware/auth")
const router=express.Router()
router.get("/",protect,authorize("super_admin","admin","user"),getSupplierPayments)
router.post("/",protect,authorize("super_admin","admin","user"),addSupplierPayment)
router.delete("/:id",protect,authorize("super_admin"),deletePayment)
module.exports = router
