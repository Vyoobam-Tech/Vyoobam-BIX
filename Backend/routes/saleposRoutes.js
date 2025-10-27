const express=require('express')
const {getSalePOSs,addSalePOS, deleteSale, updateSale} = require("../controllers/saleposController")
const router = express.Router()
router.get("/",getSalePOSs)
router.post("/",addSalePOS)
router.delete("/:id",deleteSale)
router.put("/:id",updateSale)
module.exports=router