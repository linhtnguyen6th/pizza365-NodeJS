//import thư viện mongoose
const mongoose = require("mongoose");
//import models
const userModel = require("../models/userModel");


//Call API
//C - Create users
const createUser = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    let body = req.body;

    //B2: Validate dữ liệu
    //fullName
    if (!body.fullName) {
        return res.status(400).json({
            message: `Full name is required`
        });
    };
    //email
    if(!body.email) {
        return res.status(400).json({
            message: `Email is required`
        });
    };
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
        return res.status(400).json({
            message: `Email is invalid`
        });
    };
    //address
    if(!body.address) {
        return res.status(400).json({
            message: `Address is required`
        });
    };
    //phone
    if(!body.phone) {
        return res.status(400).json({
            message: `Phone number is required`
        });
    };

    //B3: Gọi model xử lý dữ liệu
    let newUserData = {
        _id: mongoose.Types.ObjectId(),
        fullName: body.fullName,
        email: body.email,
        address: body.address,
        phone: body.phone
    };

    userModel.create(newUserData, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(201).json({
            message: `Create user successfully`,
            newUser: data
        });
    });
};

//R - Get all users
const getAllUser = (req, res) => {
    // B1: Thu thập dữ liệu từ req
    // B2: Validate dữ liệu
    // B3: Gọi model xử lý dữ liệu
    userModel.find((error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Get all users successfully`,
            users: data
        });
    });
};

//R - Get user by userId
const getUserById = (req, res) => {
    //B1: Thu thập dữ liệu
    let userId = req.params.userId;

    //B2: Validate dữ liệu
    //userId
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: "User ID is invalid!"
        });
    };

    //B3: Gọi model xử lý dữ liệu
    userModel.findById(userId, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(201).json({
            message: `Get user successfully. UserID: ${userId}`,
            users: data
        });
    });
};

//U - Update user by userId
const updateUserById = (req, res) => {
    //B1: Thu thập dữ liệu
    let userId = req.params.userId;
    let body = req.body;

    //B2: Validate dữ liệu
    //userId
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: "User ID is invalid!"
        });
    };

    //body
    //fullName
    if (body.fullName !== undefined && !body.fullName) {
        return res.status(400).json({
            message: `Full name is required`
        });
    };
    //email
    if(body.email !== undefined && !body.email) {
        return res.status(400).json({
            message: `Email is required`
        });
    };
    //address
    if(body.address !== undefined && !body.address) {
        return res.status(400).json({
            message: `Address is required`
        });
    };
    //phone
    if(body.phone !== undefined && !body.phone) {
        return res.status(400).json({
            message: `Phone number is required`
        });
    };

    //B3: Gọi model xử lý dữ liệu
    let userUpdate = {
        fullName: body.fullName,
        email: body.email,
        address: body.address,
        phone: body.phone,
    };

    userModel.findByIdAndUpdate(userId, userUpdate, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Update user successfully. User ID: ${userId}`,
            userUpdate: data
        });
    });
};

//D - Delete user by userId
const deleteUserById = (req, res) => {
    //B1: Thu thập dữ liệu
    let userId = req.params.userId;
    //B2: Validate dữ liệu
    //userId
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: "User ID is invalid!"
        });
    };

    //B3: Gọi model để xử lý dữ liệu
    userModel.findByIdAndDelete(userId, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(204).json({
            message: `Delete user successfully`
        });
    });
};


//export user controller thành 1 module
module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
};