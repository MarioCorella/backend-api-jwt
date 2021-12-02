const { Router } = require('express');
const { check } = require('express-validator');
const authRouter = Router();
const { login, loginGoogle } = require('../controllers/auth.controller');
const { fieldValidator } = require('../middleware/field-validator');

//Route => /

authRouter.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator
], login)

authRouter.post('/google', [
    check('token', 'Google token is required').not().isEmpty(),
    fieldValidator
], loginGoogle)


module.exports = authRouter;