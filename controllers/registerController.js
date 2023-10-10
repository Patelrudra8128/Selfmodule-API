const registerTbl = require('../models/registerTbl');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try{
        const{name,email,password,role} = req.body;
        let registerData = await registerTbl.create({
            name : name,
            email : email,
            password : password,
            role : role
        })
        if(registerData){
            return res.json({ message : "User registered successfully", status : 1});
        }else{
            return res.json({ message : "User not registered", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewRegister = async (req,res) => {
    try{
        let viewData = await registerTbl.find({})
        if(viewData){
            return res.json({ data : viewData, status : 1});
        }else{
            return res.json({ message : "User not view", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteUser = async (req,res) => {
    try{
        let delUser = await registerTbl.findByIdAndDelete(req.body.id);
        if(delUser){
            return res.json({message : "User deleted successfully", status : 1});
        }else{
            return res.json({message : "User not deleted", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateUser = async (req,res) => {
    try{
        const{name,email,password,role} = req.body;
        let editUser = await registerTbl.findByIdAndUpdate(req.body.id,{
            name : name,
            email : email,
            password : password,
            role : role
        });
        if(editUser){
            return res.json({message : "User updated successfully", status : 1});
        }else{
            return res.json({message : "User not updated", status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const login = async (req,res) => {
    try{
        const{email,password} = req.body;
        let loginUser = await registerTbl.findOne({email : email});
        if(!loginUser || loginUser.password != password){
            return res.json({message : "Invalid email or password", status : 0});
        }else{
            const Token = jwt.sign({ payload : loginUser}, 'rudra', {expiresIn : '1hr'});
            return res.json({token : Token});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}


module.exports = {
    register,
    viewRegister,
    deleteUser,
    updateUser,
    login
}