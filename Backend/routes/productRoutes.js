const express = require("express");
const { getProducts, addProduct, deleteProduct, checkProductExists } = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.get("/check-exists",checkProductExists)

module.exports = router;
