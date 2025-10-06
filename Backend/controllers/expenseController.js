const Expense=require("../models/Expense")

exports.getexpenses=async (req,res) => {
    try{
        const expenses= await Expense.find().populate("warehouseId")
        res.json(expenses)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.addexpense=async (req,res) => {
    try{
        const expense=new Expense(req.body)
        await expense.save()
        res.json(expense)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.deleteexpense=async (req,res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message:"Expense Deleted"})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

