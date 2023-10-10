const subcategoryTbl = require('../models/subcategoryTbl');
const categoryTbl = require('../models/categoryTbl');

const addSubcategory = async (req,res) => {
    let insertSubcategory = await subcategoryTbl.create({
        categoryId : req.body.categoryId,
        subcategory : req.body.subcategory
    })
    if(insertSubcategory){
        return res.json({ message : "Subcategory added successfully", status : 1})
    }else{
        return res.json({ message : "Subcategory not added", status : 0})
    }
}

const viewSubcategory = async (req,res) => {
    try{
        let subcategoryData = await categoryTbl.aggregate([
            {
              $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "categoryId",
                as: "viewSubcategory"
              }
            }
          ])
        if(subcategoryData){
            return res.json({ data : subcategoryData, status : 1});
        }else{
            return res.json({ message : "Subcategory not view", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteSubcategory = async (req,res) => {
    try{
        let delSubcategory = await subcategoryTbl.findByIdAndDelete(req.body.id);
        if(delSubcategory){
            return res.json({message : "Subcategory deleted successfully", status : 1});
        }else{
            return res.json({message : "Subcategory not deleted", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateSubcategory = async (req,res) => {
    try{
        let editSubcategory = await subcategoryTbl.findByIdAndUpdate(req.body.id,{
            categoryId : req.body.categoryId,
            subcategory : req.body.subcategory
        });
        if(editSubcategory){
            return res.json({message : "Subcategory updated successfully", status : 1});
        }else{
            return res.json({message : "Subcategory not updated", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addSubcategory,
    viewSubcategory,
    deleteSubcategory,
    updateSubcategory
}