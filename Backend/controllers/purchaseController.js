const Purchase = require("../models/Purchase")

exports.getPurchases = async (req, res) => {
  try {
    let purchases
    if(req.user.role){
      purchases=await Purchase.find({created_by_role:{$in:["super_admin","admin"]}}).populate('supplier_id warehouse_id items.product_id')
    }
    else{
     purchases = await Purchase.find().populate('supplier_id warehouse_id items.product_id');
    }
   
    res.json(purchases);
  }
  catch {
    res.status(500).json({ error: err.message })
  }
}

exports.addPurchase = async (req, res) => {
  try {
    const purchase = new Purchase({...req.body,created_by_role:req.user.role});
    await purchase.save();
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deletePurchase = async (req, res) => {
  try {
    const deleted = await Purchase.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json({ message: "Purchase deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
