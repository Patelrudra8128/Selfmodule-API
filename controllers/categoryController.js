const categoryTbl = require('../models/categoryTbl');

const addCategory = async (req,res) => {
    let insertCategory = await categoryTbl.create({
        category : req.body.category
    })
    if(insertCategory){
        return res.json({ message : "Category added successfully", status : 1})
    }else{
        return res.json({ message : "Category not added", status : 0})
    }
}

const viewCategory = async (req,res) => {
    try{
        let categoryData = await categoryTbl.find({})
        if(categoryData){
            return res.json({ data : categoryData, status : 1});
        }else{
            return res.json({ message : "Category not view", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteCategory = async (req,res) => {
    try{
        let delCategory = await categoryTbl.findByIdAndDelete(req.body.id);
        if(delCategory){
            return res.json({message : "Category deleted successfully", status : 1});
        }else{
            return res.json({message : "Category not deleted", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateCategory = async (req,res) => {
    try{
        let editCategory = await categoryTbl.findByIdAndUpdate(req.body.id,{
            category : req.body.category
        });
        if(editCategory){
            return res.json({message : "Category updated successfully", status : 1});
        }else{
            return res.json({message : "Category not updated", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addCategory,
    viewCategory,
    deleteCategory,
    updateCategory
}