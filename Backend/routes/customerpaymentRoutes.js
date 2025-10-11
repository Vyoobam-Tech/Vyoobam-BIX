const express=require("express")
const {getCustomerPayments,addCustomerPayment, deletePayment}=require("../controllers/customerpaymentController")
const {protect,authorize}=require("../middleware/auth")
const router=express.Router()
router.get("/",protect,authorize("super_admin","admin","user"),getCustomerPayments)
router.post("/",protect,authorize("super_admin","admin","user"),addCustomerPayment)
router.delete("/:id",protect,authorize("super_admin","admin"),deletePayment)
module.exports=router