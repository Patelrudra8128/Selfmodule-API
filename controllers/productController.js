const productTbl = require('../models/productTbl');
const subcategoryTbl = require('../models/subcategoryTbl');
const fs = require('fs')

const addProduct = async (req,res) => {
    try {
        const{categoryId,subcategoryId,product,quantity,description,price} = req.body;
        let inProduct = await productTbl.create({
            categoryId : categoryId,
            subcategoryId : subcategoryId,
            product : product,
            quantity : quantity,
            description : description,
            price : price,
            image : req.file.path
        })
        if(inProduct){
            return res.json({ message : "Product added successfully", status : 1});
        }else{
            return res.json({ message : "Product not added", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewProduct = async (req,res) => {
    try {
        // let ProductData = await productTbl.find({}).populate('category').populate('subcategory');
        let ProductData = await subcategoryTbl.aggregate([
            {
                $lookup : {
                    from : "products",
                    localField : "_id",
                    foreignField : "subcategoryId",
                    as : 'viewProduct'
                }
            }
        ])
        if(ProductData){
            return res.json({ data : ProductData });
        }else{
            return res.json({ message : "Product not added", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteProduct = async (req,res) => {
    try{
        let delproduct = await productTbl.findByIdAndDelete(req.body.id);
        fs.unlinkSync(req.file.path);
        if(delproduct){
            return res.json({ message : "Product deleted successfully", status : 1});
        }else{
            return res.json({ message  : "Product not deleted", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addProduct,
    viewProduct,
    deleteProduct
}