const express=require("express")
const {getWarehouses,addWarehouse, deleteWarehouse}=require("../controllers/warehouseController")
const {protect,authorize}=require("../middleware/auth")
const router = express.Router()
router.get("/",protect,authorize("super_admin","admin","user"),getWarehouses)
router.post("/",protect,authorize("super_admin","admin"),addWarehouse)
router.delete("/:id",protect,authorize("super_admin","admin"),deleteWarehouse)

module.exports = router