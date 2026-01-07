const SalesReturn = require("../models/SalesReturn");
const Sale = require("../models/Sale");
const Customer = require("../models/Customer");
const Product= require("../models/Product")

// Create a new Sales Return
exports.addSalesReturn = async (req, res) => {
  try {
    const { invoice_no, customer_id, items, reason } = req.body;

    if (!invoice_no || !customer_id || !items?.length || !reason) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const sale = await Sale.findById(invoice_no);
    if (!sale) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Validate & enrich items
    const enrichedItems = [];

    for (const item of items) {
      const saleItem = sale.items.find(
        (si) => si.product_id.toString() === item.product_id
      );

      if (!saleItem) {
        return res.status(400).json({
          message: "Product not found in sale invoice",
        });
      }

      if (item.quantity > saleItem.quantity) {
        return res.status(400).json({
          message: "Return quantity exceeds sold quantity",
        });
      }

      const product = await Product.findById(item.product_id);

      enrichedItems.push({
        product_id: item.product_id,
        product_name: product?.name || "Unknown Product",
        quantity: item.quantity,
        return_amount: item.return_amount,
      });
    }

    const salesReturn = new SalesReturn({
      invoice_no,
      invoice_number: sale.invoice_no, // snapshot
      customer_id,
      customer_name: customer.name,
      customer_phone: customer.phone,
      items: enrichedItems,
      reason,
      created_by: req.user._id,
      created_by_name: req.user.name,
    });

    await salesReturn.save();

    res.status(201).json({
      message: "Sales Return Created Successfully",
      salesReturn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all Sales Returns
exports.getSalesReturns = async (req, res) => {
  try {
    const salesReturns = await SalesReturn.find()
      .populate("customer_id", "name phone")
      .populate("items.product_id", "name price")
      .populate("created_by", "name email");

    res.status(200).json(salesReturns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Optional: Get Sales Return by ID
exports.getSalesReturnById = async (req, res) => {
  try {
    const salesReturn = await SalesReturn.findById(req.params.id)
      .populate("customer_id", "name phone")
      .populate("items.product_id", "name price")
      .populate("created_by", "name email");

    if (!salesReturn) {
      return res.status(404).json({ message: "Sales Return not found" });
    }

    res.status(200).json(salesReturn);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
