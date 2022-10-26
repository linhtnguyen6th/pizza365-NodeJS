//import thư viện mongoose
const mongoose = require("mongoose");

//khai báo Schema
const Schema = mongoose.Schema;

//khai báo module drink
const drinkSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    maNuocUong: {
        type: String,
        unique: true,
        required: true
    },
    tenNuocUong: {
        type: String,
        required: true
    },
    donGia: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
}); 

module.exports = mongoose.model("drink", drinkSchema);