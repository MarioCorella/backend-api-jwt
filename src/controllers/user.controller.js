const User  = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    const users = await User.find({}, 'user email google');
    
    res.status(200).json(users);
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        const emailAlreadyExist = await User.findOne({email});
        
        if (emailAlreadyExist) {
            return res.status(400).json({"msg": "Email already exist"})
        }

        const user = new User(req.body);
        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt); 

        const token = await generateJWT(user._id);
        // create user
        await user.save();
        return res.status(200).json( { user, token } );

        
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "Error"})
    }


    
}

const updateUser = async (req, res = reponse) => {
    try {
        const userId = req.params.id;
        const userDB = User.findById(userId);

        if(!userDB) {
            return res.status(404).json({msg: "User not found"});
        }

        const fields = req.body;
        delete fields.google;
        delete fields.password;

        const updatedUser = await User.findByIdAndUpdate(userId, fields, {new: true});
        res.status(200).json({updatedUser});

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Error'})
    }
}

const deleteUser = async (req, res = reponse) => {
    const userId = req.params.id;
    const userDB = User.findById(userId);
    
    try {
        
        if (!userDB) {
            return res.status(404).json({msg: "User not found"});
        } 
        
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({deletedUser});
        } else {
            return res.status(404).json({msg: "User not found"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Error'})
    }
}




module.exports = { 
    getUsers,
    createUser,
    updateUser,
    deleteUser
}