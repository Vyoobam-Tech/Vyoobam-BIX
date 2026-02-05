const Customer = require('../models/Customer')

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("created_by","name email role").populate("updated_by", "name email");
    res.json(customers)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.addCustomer = async (req, res) => {
  try {
    const customer = new Customer({...req.body,created_by:req.user._id,created_by_name:req.user.name})
    await customer.save()
    res.json(customer)
  }
  catch (err) {
    console.error("Error saving customer")
    res.status(400).json({ error: err.message })
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCustomer=async(req,res)=>{
    try{
      const oldCustomer = await Customer.findById(req.params.id)
      if(!oldCustomer){
        return res.status(404).json({error:"Customer not found"})
      }
      const allowedFields={...req.body}
      delete allowedFields.id
      delete allowedFields._id
      allowedFields.updated_by=req.user._id
      allowedFields.updated_by_name = req.user.name
      allowedFields.updated_by_role=req.user.role
      allowedFields.updatedAt=new Date()
      allowedFields.history={
        oldValue:oldCustomer.name,
        newValue:req.body.name || oldCustomer.name,
      }
      const updated=await Customer.findByIdAndUpdate(req.params.id,allowedFields,{new:true}).populate("created_by","name email role").populate("updated_by","name email role")
      res.json(updated)
    }catch(err){
      res.status(400).json({error:err.message})
    }
}


exports.getCustomerById=async (req,res) => {
  try{
    const customer=await Customer.findById(req.params.id)
    .populate("created_by","name email role").populate("updated_by","name email role")
    if(!customer){
      return res.status(404).json({error:"Customer not found"})
    }
    return res.json(customer)
  }catch(err){
    res.status(404).json({error:"Server Error"})
  }
}
