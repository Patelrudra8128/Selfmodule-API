const cartTbl = require('../models/cartTbl');
const productTbl = require('../models/productTbl');

const addtoCart = async (req,res) => {
    try{
        let product = await productTbl.findById(req.body.id);
        if(product){
            let checkCart = await cartTbl.findOne({productId : req.body.id});
            if(checkCart){
                return res.json({ message : "Product already exist in Cart", status : 0});
            }else{
                let cartItem = await cartTbl.create({
                    productId : product.id,
                    product : product.product,
                    quantity : product.quantity,
                    description : product.description,
                    price : product.price,
                    image : product.image
                })
                if(cartItem){
                    return res.json({ message : "Product added to Cart", status : 1});
                }else{
                    return res.json({ message : "Product not added to Cart", status : 0});
                }
            }
        }else{
            return res.json({ message : "Product not found", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewCart = async (req,res) => {
    try{
        let data = await cartTbl.find({})
        if(data){
            return res.json({ CartData : data});
        }else{
            return res.json({message:"data not view"})
        }
    }catch(err){ 
        console.log(err);
        return false;
    }
}

const deleteCart = async (req,res) => {
    try{
        let id = req.body.id;
        let delCart = await cartTbl.findByIdAndDelete(id);
        if(delCart){
            return res.json({message : "Product deleted from cart successfully", status : 1});
        }else{
            return res.json({message : "Product not deleted", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addtoCart,
    viewCart,
    deleteCart
}