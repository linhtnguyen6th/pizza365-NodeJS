//import thư viện mongoose
const mongoose = require("mongoose");

//import voucher model
const voucherModel = require("../models/voucherModel");

//CRUD
//C - Create voucher list - POST method
const createVoucher = (req, res) => {
    //B1: Thu thập dữ liệu từ req body
    let body = req.body;
    //B2: Validate dữ liệu
    //maVoucher
    if (!body.bodyMaVoucher) {
        res.status(400).json({
            message: `Mã Voucher is invalid`
        });
    };
    //phanTramGiamGia
    if (!Number.isInteger(body.bodyPhanTramGiamGia) || body.bodyPhanTramGiamGia < 0) {
        res.status(400).json({
            message: `Phần trăm giảm giá is invalid`
        });
    };

    //B3: Gọi model thực hiện thao tác nghiệp vụ
    let newVoucherData = {
        _id: mongoose.Types.ObjectId(),
        maVoucher: body.bodyMaVoucher,
        phanTramGiamGia: body.bodyPhanTramGiamGia,
        ghiChu: body.bodyGhiChu
    };

    voucherModel.create(newVoucherData, (error, data) => {
        if(error) {
            res.status(500).json({
                message: error.message
            });
        };

        return res.status(201).json({
            message: `Create successfully`,
            newVoucherData: data
        });
    });
};

//R - Read all voucher - GET method
const getAllVoucher = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    //B2: Validate dữ liệu
    //B3: Gọi model thực hiện thao tác
    voucherModel.find((error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Get all vouchers successfully`,
            vouchers: data 
        });
    });
};

//R - Read one voucher by voucherId - GET method
const getVoucherById = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    let id = req.params.voucherId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid) {
        return res.status(400).json({
            message: `Voucher ID is invalid`
        });
    };

    //B3: Gọi model thực hiện thao tác
    voucherModel.findById(id, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(201).json({
            message: `Get voucher successfully. Voucher ID: ${id}`,
            vouchers: data
        });
    });
};

//U - Update one voucher by voucherId - PUT method
const updateVoucherById = (req, res) => {
    //B1: Thu thập dữ liệu
    let id = req.params.voucherId;
    let body = req.body;
    //B2: Validate dữ liệu
    //id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `Voucher ID is invalid`
        });
    };
    //body
    //maVoucher
    if(body.bodyMaVoucher !== undefined && body.bodyMaVoucher == "") {
        return res.status(400).json({
            message: `Mã voucher is required!`
        });
    };

    //phanTramGiamGia
    if(body.bodyPhanTramGiamGia !== undefined && body.bodyPhanTramGiamGia == "") {
        return res.status(400).json({
            message: `Phần trăm giảm giá is required`
        });
    };

    //B3: Gọi model thực hiện thao tác nghiệp vụ
    let voucherUpdate = {
        maVoucher: body.bodyMaVoucher,
        phanTramGiamGia: body.bodyPhanTramGiamGia,
        ghiChu: body.bodyGhiChu
    };
    voucherModel.findByIdAndUpdate(id, voucherUpdate, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Update voucher successfully. Voucher ID: ${id}`,
            updatedVoucher: data
        });
    });
};

//D - Delete one voucher by voucherId - DELETE method
const deleteVoucherByID = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    let id = req.params.voucherId;

    //B2: Validate dữ liệu
    //id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `Voucher ID is invalid`
        });
    };

    //B3: Gọi model xử lý dữ liệu
    voucherModel.findByIdAndDelete(id, (error, data) => {
        if(error) {
            return res.status(400).json({
                message: error.message
            });
        };

        return res.status(204).json({
            message: `Delete voucher successfully. Voucher ID: ${id}`
        });
    });
};

//export voucher controller thành 1 module
module.exports = {
    createVoucher,
    getAllVoucher,
    getVoucherById,
    updateVoucherById,
    deleteVoucherByID
};