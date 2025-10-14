const express = require("express");
const {getSaleReports,addSaleReport, deleteSaleReport} = require("../controllers/saleReportController");
const {getPurchaseReports,addPurchaseReport, deletePurchaseReport} = require("../controllers/purchaseReportController");
const {getStockReports,addStockReport, deleteStockReport}=require("../controllers/stockReportController")
const {getGSTReports,addGSTReport, deletegstReport}=require("../controllers/gstReportController");
const { getProfitLoss } = require("../controllers/profitlossController");
const {protect,authorize}=require("../middleware/auth")
const router = express.Router();  

router.get("/sales",protect,authorize("super_admin","admin","user"), getSaleReports);
router.post("/sales",protect,authorize("super_admin","admin","user"), addSaleReport);
router.delete("/sales/:id",protect,authorize("super_admin"),deleteSaleReport)

router.get("/purchase", getPurchaseReports);
router.post("/purchase", addPurchaseReport);
router.delete("/purchase/:id",deletePurchaseReport)

router.get("/stock",protect,authorize("super_admin","admin"),getStockReports)
router.post("/stock",protect,authorize("super_admin","admin"),addStockReport)
router.delete("/stock/:id",protect,authorize("super_admin"),deleteStockReport)

router.get("/gst",getGSTReports)
router.post("/gst",addGSTReport)
router.delete("/gst/:id",deletegstReport)

router.get("/profitloss",getProfitLoss)
module.exports = router;   