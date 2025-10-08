const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addCategory=async(req,res)=>{
  try {
    const {parental_id,name,code,subcategory,brands = [],status}=req.body;

    let existing=await Category.findOne({name});

    if (existing) {
      
      const mergedBrands = Array.from(new Set([...existing.brands, ...brands]));
      existing.brands = mergedBrands;
      await existing.save();
      return res.status(400).json(existing);
    }

    const category = new Category({
      parental_id,
      name,
      code,
      subcategory,
      brands,
      status,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error("Error saving category:", err);
    res.status(400).json({ message: err.message });
  }
};



exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
