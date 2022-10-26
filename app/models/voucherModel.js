//import thư viện mongoose
const mongoose = require("mongoose");

//khai báo Schema
const Schema = mongoose.Schema;

//khai báo module voucher
const voucherSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    maVoucher: {
        type: String,
        unique: true,
        required: true
    },
    phanTramGiamGia: {
        type: Number,
        required: true
    },
    ghiChu: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("voucher", voucherSchema);