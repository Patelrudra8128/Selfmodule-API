const mongoose = require('mongoose');
const cartTbl = mongoose.Schema({
    productId : {
        type : String,
        required : true
    },
    product : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        default : 1
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    }
});

const cart = mongoose.model('cart',cartTbl);
module.exports = cart;