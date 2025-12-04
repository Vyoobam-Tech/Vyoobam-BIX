const express = require("express");
const {getCustomers,addCustomer,deleteCustomer, updateCustomer, getCustomerById} = require("../controllers/customerController");
const router = express.Router();
const {protect} =require("../middleware/auth")
router.get("/",protect, getCustomers);
router.post("/",protect, addCustomer);
router.delete("/:id",protect,deleteCustomer);
router.put("/:id",protect,updateCustomer)
router.get("/:id",protect,getCustomerById)
module.exports = router;