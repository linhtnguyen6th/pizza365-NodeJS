//Khai báo thư viện express
const express = require("express");
//Import voucherMiddleware
const { voucherMiddleware } = require("../middlewares/voucherMiddleware");

//Import voucher controller
const { createVoucher, getAllVoucher, getVoucherById, updateVoucherById, deleteVoucherByID } = require("../controllers/voucherController");


//Khởi tạo router
const voucherRouter = express.Router();

//sử dụng voucherMiddleware
voucherRouter.use(voucherMiddleware);

//C - Create voucher data
voucherRouter.post("/vouchers", createVoucher);

//R - Get all vouchers
voucherRouter.get("/vouchers", getAllVoucher);

//R - Get one voucher by voucherId
voucherRouter.get("/vouchers/:voucherId", getVoucherById);

//U - Update one voucher by voucherId
voucherRouter.put("/vouchers/:voucherId", updateVoucherById);

//D - Delete one voucher by voucherId
voucherRouter.delete("/vouchers/:voucherId", deleteVoucherByID);

// export voucher router thành 1 module
module.exports = { voucherRouter };