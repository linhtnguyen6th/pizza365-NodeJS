//import thư viện mongoose
const mongoose = require("mongoose");

//import drink model
const drinkModel = require("../models/drinkModel");

//CRUD
//C - Create drink list - POST method
const createDrink = (req, res) => {
    //B1: Thu thập dữ liệu từ req body
    let body = req.body;

    //B2: Validate dữ liệu
    //maNuocUong
    if(!body.bodyMaNuocUong) {
        return res.status(400).json({
            message: `Mã nước uống is required!`
        });
    };

    //tenNuocUong
    if(!body.bodyTenNuocUong) {
        return res.status(400).json({
            message: `Tên nước uống is required`
        });
    };

    //donGia
    if(!Number.isInteger(body.bodyDonGia)|| body.bodyDonGia < 0) {
        return res.status(400).json({
            message: `Đơn giá is invalid`
        });
    };

    //B3: Gọi model thực hiện thao tác nghiệp vụ
    let newDrinkData = {
        _id: mongoose.Types.ObjectId(),
        maNuocUong: body.bodyMaNuocUong,
        tenNuocUong: body.bodyTenNuocUong,
        donGia: body.bodyDonGia
    };

    //sử dụng function create() để tạo data
    drinkModel.create(newDrinkData, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };
        return res.status(201).json({
            messsage: "Create successfully",
            newDrinkData: data
        });
    });
};


//R - Read all drinks - GET method
const getAllDrinks = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    //B2: Validate dữ liệu
    //B3: Gọi model xử lý dữ liệu
    drinkModel.find((error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Get all drinks successfully`,
            drinks: data
        });
    });
};

//R - Read a drink by drinkId, GET method
const getDrinkById = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    let id = req.params.drinkId
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `Drink ID is invalid`
        });
    };

    //B3: Gọi model xử lý dữ liệu
    drinkModel.findById(id, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(201).json({
            message: `Get course successfully. Drink ID: ${id}`,
            drinks: data
        });
    });
};

//U - Update a drink by drinkId, PUT method
const updateDrinkbyDrinkId = (req, res) => {
    //B1: Thu thập dữ liệu
    let id = req.params.drinkId;
    let body = req.body;
    //B2: Validate dữ liệu
    //id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `Drink ID is invalid`
        });
    };
    //body
    //maNuocUong
    if(body.bodyMaNuocUong !== undefined && body.bodyMaNuocUong == "") {
        return res.status(400).json({
            message: `Mã nước uống is required!`
        });
    };

    //tenNuocUong
    if(body.bodyTenNuocUong !== undefined && body.bodyTenNuocUong == "") {
        return res.status(400).json({
            message: `Tên nước uống is required`
        });
    };

    //donGia
    if(body.bodyDonGia !== undefined && (!Number.isInteger(body.bodyDonGia) || body.bodyDonGia < 0)) {
        return res.status(400).json({
            message: `Đơn giá is invalid`
        });
    };

    //B3: Gọi model thực hiện thao tác nghiệp vụ
    let drinkUpdate = {
        maNuocUong: body.bodyMaNuocUong,
        tenNuocUong: body.bodyTenNuocUong,
        donGia: body.bodyDonGia
    };
    drinkModel.findByIdAndUpdate(id, drinkUpdate, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Update drink successfully. Drink ID: ${id}`,
            updatedDrink: data
        });
    });


};

//D - Delete a drink by drinkId, DELETE method
const deleteDrinkByDrinkId = (req, res) => {
    //B1: Thu thập dữ liệu
    let id = req.params.drinkId;
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `Drink ID is invalid`
        });
    };

    //B3: Gọi model thực hiện các thao tác nghiệp vụ
    drinkModel.findByIdAndDelete(id, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(204).json({
            message: `Delete drink successfully. Drink ID: ${id}`
        });
    });
};


//export drink controller thành 1 module
module.exports = {
    createDrink,
    getAllDrinks,
    getDrinkById,
    updateDrinkbyDrinkId,
    deleteDrinkByDrinkId
};