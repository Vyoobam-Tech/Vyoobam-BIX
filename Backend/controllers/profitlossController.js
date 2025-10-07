
const Sale = require('../models/Sale');
const StockLedger = require('../models/Stockledger');
const Expense = require('../models/Expense');
const mongoose = require('mongoose');

exports.getProfitLoss = async (req, res) => {
  try {
    const { fromDate, toDate, warehouseId } = req.query;
    const saleMatch = {};
    if (fromDate && toDate) {
      saleMatch.invoice_date_time = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }
    const sales = await Sale.find(saleMatch).lean();

    let totalSales = 0;
    let totalDiscount = 0;

    for (const sale of sales) {
      totalSales += Number(sale.grand_total || 0);
      totalDiscount += Number(sale.discount_amount || 0);
    }

    const netSales = totalSales - totalDiscount;
    let cogs = 0;

    for (const sale of sales) {
      for (const item of sale.items) {
     
        const stockFilter = {
          productId: new mongoose.Types.ObjectId(item.product_id),
          txnType: "PURCHASE",
          balanceQty: { $gt: 0 },
        };
        if (warehouseId && warehouseId !== '') {
          stockFilter.warehouseId = new mongoose.Types.ObjectId(warehouseId);
        }

        const batches = await StockLedger.find(stockFilter)
          .sort({ txnDate: 1 })
          .lean();

        let qtyToConsume = item.qty;

        for (const batch of batches) {
          if (qtyToConsume <= 0) break;

          const availableQty = batch.balanceQty;
          const consumedQty = Math.min(qtyToConsume, availableQty);
          cogs += consumedQty * batch.rate;
          qtyToConsume -= consumedQty;
        }
      }
    }
    const expenseFilter = {};
    if (fromDate && toDate) {
      expenseFilter.expenseDate = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }
    if (warehouseId && warehouseId !== '') {
      expenseFilter.warehouseId = new mongoose.Types.ObjectId(warehouseId);
    }
const expensesList = await Expense.find(expenseFilter).lean();
    const expenses = expensesList.reduce((sum, e) => sum + e.amount, 0);
    const grossProfit = netSales - cogs;
    const netProfit = grossProfit - expenses;

    res.json({
      totalSales,
      netSales,
      cogs,
      grossProfit,
      expenses,
      netProfit,
      details: [
        { category: "Sales Revenue", amount: totalSales, notes: "Total sales before discounts" },
        { category: "Net Sales", amount: netSales, notes: "After discounts" },
        { category: "COGS", amount: cogs, notes: "Cost of goods sold" },
        { category: "Expenses", amount: expenses, notes: "Rent, salary, etc." },
      ],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};





// // --- Memory-safe & optimized COGS calculation ---
// // 1️⃣ Pre-fetch all product IDs in the date range
// const productIdsCursor = Sale.find(saleMatch)
//   .select("items.product_id")
//   .lean()
//   .cursor();

// const productIdSet = new Set();
// for (let saleDoc = await productIdsCursor.next(); saleDoc != null; saleDoc = await productIdsCursor.next()) {
//   for (const item of saleDoc.items) {
//     productIdSet.add(item.product_id.toString());
//   }
// }
// const allProductIds = Array.from(productIdSet).map(id => new mongoose.Types.ObjectId(id));

// // 2️⃣ Pre-fetch StockLedger batches for all relevant products
// const stockFilter = {
//   productId: { $in: allProductIds },
//   txnType: "PURCHASE",
//   balanceQty: { $gt: 0 },
// };
// if (warehouseId && warehouseId !== '') {
//   stockFilter.warehouseId = new mongoose.Types.ObjectId(warehouseId);
// }

// const allPurchaseBatches = await StockLedger.find(stockFilter)
//   .sort({ txnDate: 1 })
//   .lean();

// // 3️⃣ Group stock ledger by product to avoid filtering in loop
// const stockMap = {};
// for (const batch of allPurchaseBatches) {
//   const pid = batch.productId.toString();
//   if (!stockMap[pid]) stockMap[pid] = [];
//   stockMap[pid].push(batch);
// }

// // 4️⃣ Process each sale using cursor
// const saleCursor = Sale.find(saleMatch).lean().cursor();
// let cogs = 0;

// for (let sale = await saleCursor.next(); sale != null; sale = await saleCursor.next()) {
//   for (const item of sale.items) {
//     let qtyToConsume = item.qty;
//     const productBatches = stockMap[item.product_id.toString()] || [];

//     for (const batch of productBatches) {
//       if (qtyToConsume <= 0) break;

//       const availableQty = batch.balanceQty;
//       const consumedQty = Math.min(qtyToConsume, availableQty);
//       cogs += consumedQty * batch.rate;
//       qtyToConsume -= consumedQty;
//     }
//   }
// }
