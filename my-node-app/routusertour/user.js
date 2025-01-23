const express = require('express');
const userController = require('../controller/usercontroller.js');

const userRouter = express.Router();

userRouter.route('/')
    .get(userController.getAllUsers)
    .post(userController.postUser);

userRouter.route('/:id')
    .get(userController.getSpecificUser)
    .patch(userController.patchUser)
    .delete(userController.deleteUser);

 userRouter;
module.exports = userRouter;