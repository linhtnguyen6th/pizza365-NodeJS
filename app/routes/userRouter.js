//import thư viện express
const express = require("express");

//Import userMiddleware
const { userMiddleware } = require("../middlewares/userMiddleware");

//Import userController
const { createUser, getAllUser, getUserById, updateUserById, deleteUserById } = require("../controllers/userController");

//Khởi tạo Router
const userRouter = express.Router();

//Sử dụng userMiddleware
userRouter.use(userMiddleware);


//Call API
//C - Create user, POST method
userRouter.post("/users", createUser);

//R - Get all users, GET method
userRouter.get("/users", getAllUser);

//R - Get user by userId
userRouter.get("/users/:userId", getUserById);

//U - Update user by userId
userRouter.put("/users/:userId", updateUserById);

//D - Delete user by userId
userRouter.delete("/users/:userId", deleteUserById);






//Export user router thành 1 module
module.exports = { userRouter };