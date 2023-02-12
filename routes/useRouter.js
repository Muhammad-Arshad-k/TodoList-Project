const express  = require('express')
const userRouter  = express();
const userController = require('../controllers/userController')


userRouter.get("/",userController.login);
        