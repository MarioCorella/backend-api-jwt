const { response } = require('express');
const User  = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const {email, password } = req.body;
    try {
        const userDB = await User.findOne({email});
        if(!userDB ) {
            res.status(404).json({msg: 'Incorrect username or password'});
        }
        
        const validPassword = await bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {  
            res.status(404).json({msh: 'Incorrect username or password'});
        } else {
            const token = await generateJWT(userDB._id);
            res.status(200).json({token})
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({msg: 'Error'})
    }
}

const loginGoogle = async (req, res = response) => {
    const googleToken = req.body.token;
    console.log('google-token', googleToken)

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const userDB = await User.findOne({email});
        let user;
        if(!userDB) {
            user = new User({
                name,
                email,
                img: picture,
                password: "@@@",
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
            user.password = "@@@"
        }

        await user.save();
        const token = await generateJWT(user._id);
        res.status(200).json({token});

    } catch(err) {
        console.log(err);
        res.status(401).json('Error in Google token');
    }
}

module.exports = { 
    login,
    loginGoogle
 }