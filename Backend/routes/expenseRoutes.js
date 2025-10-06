const express=require("express")
const{getexpenses,addexpense,deleteexpense}=require("../controllers/expenseController")

const router=express.Router()

router.get("/",getexpenses)
router.post("/",addexpense)
router.delete("/:id",deleteexpense)

module.exports=router