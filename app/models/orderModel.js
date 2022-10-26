//import thư viện mongoose
const mongoose = require("mongoose");

//khai báo Schema
const Schema = mongoose.Schema;

//khai báo module order
const orderSchema = new Schema({
    orderCode: {
        type: String,
        required: true,
        unique: true
    },
    pizzaSize: {
        type: String,
        required: true
    },
    pizzaType: {
        type: String,
        required: true
    },
    voucher: {
        type: String, ref: "voucher"
    },
    drink: {
        type: String, ref: "drink"
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});


module.exports = mongoose.model("order", orderSchema);