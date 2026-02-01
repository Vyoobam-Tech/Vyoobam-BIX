const Tax = require("../models/Tax");
exports.getTaxes = async (req, res) => {
  try{
    let taxes
      if(req.user.role){
        taxes=await Tax.find({created_by_role:{$in:["super_admin","admin"]}}).populate("created_by","name email role")
      }
      else{
        taxes =await Tax.find().populate("created_by","name email role")
      }
    res.json(taxes)
    }
    catch (err) {
    res.status(500).json({ error: err.message })
  }
    
}
  
exports.addTax = async (req, res) => {
  try {
    const tax = new Tax({...req.body,created_by:req.user._id,created_by_role:req.user.role,})
    await tax.save()
    res.status(201).json(tax)
  }
  catch (err) {
    console.error("Error saving tax:",err)
    res.status(400).json({ error: err.message })
  }
}

exports.deletetax = async (req, res) => {
  try {
    const deleted = await Tax.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Tax not found" });
    }
    res.json({ message: "Tax deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatetax=async(req,res)=>{
  try{
    const oldTax = await Tax.findById(req.params.id)
    if(!oldTax){
      return res.status(404).json({error:"Tax not found"})
    }
    const allowedFields={...req.body}
    delete allowedFields.id
    delete allowedFields._id
    allowedFields.updated_by=req.user._id
    allowedFields.updated_by_role=req.user.role
    allowedFields.updatedAt=new Date()
    allowedFields.history={
      oldValue:oldTax.name,
      newValue:req.body.name || oldTax.name,
    }
    const updated=await Tax.findByIdAndUpdate(req.params.id,allowedFields,{new:true})
    .populate("created_by","name email role")
    .populate("updated_by","name email role")
    // const updated=await Tax.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updated)

  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}

exports.getTaxById = async (req,res) => {
  try{
    const tax = await Tax.findById(req.params.id)
    .populate("created_by","name email role")
    .populate("updated_by","name email role")
    if(!tax){
      return res.status(404).json({error:"Tax not found"})
    }
    return res.json(tax);
  }
  catch(err){
    res.status(500).json({error:"Server Error"})
  }
}