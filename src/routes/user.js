const { Router } = require('express');
const userRouter = Router();
const { check } = require('express-validator');
const { fieldValidator } = require('../middleware/field-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

// Route => /api/users
userRouter.get('/', getUsers);

userRouter.post('/', [
    check('user', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator
], createUser);

userRouter.put('/:id',[
    check('email', 'Email is required').isEmail(),
    check('user', 'Username is required').not().isEmpty(),
    fieldValidator
], updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;