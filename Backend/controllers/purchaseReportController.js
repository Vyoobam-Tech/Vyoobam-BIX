const Purchase = require("../models/Purchase");
exports.getPurchaseReports = async (req, res) => {
  try {
    const { from_date, to_date } = req.query;
    if (!from_date || !to_date) {
      return res.status(400).json({ message: "From date & To date required" });
    }
    const purchases = await Purchase.find({
      invoice_date: {
        $gte: new Date(from_date + "T00:00:00"),
        $lte: new Date(to_date + "T23:59:59"),
      },
    })
      .populate("supplier_id", "name phone")
      .populate("items.product_id", "name")
      .populate("warehouse_id", "name store_name")
      .sort({ invoice_date: -1 });
    res.status(200).json(purchases);
  } catch (err) {
    console.error("Purchase report error:", err);
    res.status(500).json({ error: err.message });
  }
};
