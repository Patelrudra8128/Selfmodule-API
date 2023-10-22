const express = require('express');
const routes = express.Router();

const registerController = require('../controllers/registerController');
const categoryController = require('../controllers/categoryController');
const subcategoryController = require('../controllers/subcategoryController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const multer = require('multer');

const passport = require('passport');
const { verifyToken } = require('../config/passport-selfmodule');
const { checkRole } = require('../config/passport-selfmodule');

const fileupload = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'./uploads');
    },
    filename : (req,file,cb) => {
        cb(null,Date.now()+file.originalname);
    }
})

const imageUpload = multer({storage : fileupload}).single('image');


routes.post('/register',registerController.register);
routes.get('/viewRegister',verifyToken,checkRole('admin'),registerController.viewRegister);
routes.delete('/deleteUser',registerController.deleteUser);
routes.put('/updateUser',registerController.updateUser);
routes.post('/login',registerController.login);

routes.post('/addCategory',categoryController.addCategory);
routes.get('/viewCategory',categoryController.viewCategory);
routes.delete('/deleteCategory',categoryController.deleteCategory);
routes.put('/updateCategory',categoryController.updateCategory);

routes.post('/addSubcategory',subcategoryController.addSubcategory);
routes.get('/viewSubcategory',subcategoryController.viewSubcategory);
routes.delete('/deleteSubcategory',subcategoryController.deleteSubcategory);
routes.put('/updateSubcategory',subcategoryController.updateSubcategory);

routes.post('/addProduct',imageUpload,productController.addProduct);
routes.get('/viewProduct',productController.viewProduct);
routes.delete('/deleteProduct',productController.deleteProduct);
// routes.put('/updateProduct',productController.updateProduct);

routes.post('/addtoCart',cartController.addtoCart);
routes.get("/viewCart",cartController.viewCart);
routes.delete('/deleteCart',cartController.deleteCart);

module.exports = routes;