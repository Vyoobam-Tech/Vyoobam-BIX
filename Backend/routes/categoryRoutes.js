const express = require("express");
const { getCategories, addCategory, deleteCategory, getSubcategoriesByCategoryId } = require("../controllers/categoryController");
const {protect,authorize}=require("../middleware/auth")
const router = express.Router();

router.get("/", protect,authorize("super_admin","admin","user") ,getCategories);
router.post("/", protect,authorize("super_admin","admin"), addCategory);
router.delete("/:id",protect,authorize("super_admin","admin"), deleteCategory);
router.get("/subcategories/:name",protect,authorize("super_admin","admin","user"), getSubcategoriesByCategoryId);
module.exports = router;
