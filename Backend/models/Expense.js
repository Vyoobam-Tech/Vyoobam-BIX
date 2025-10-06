const mongoose=require("mongoose")

const ExpenseSchema = new mongoose.Schema({
    expenseDate:{type:Date, required:true},
    warehouseId:{type:mongoose.Schema.Types.ObjectId,ref:"Warehouse",required:true},
    expenseHead:{type:String,enum:["RENT","EB BILL", "SALARY"],required:true},
    amount:{type:Number, required:true},
    notes:{type:String}
},
{timestamps:true})

module.exports = mongoose.model("Expense",ExpenseSchema)