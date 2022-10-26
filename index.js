//Import thư viện expressjs tương đương import express from "express"; 
const express = require("express");
//Import thư viện mongoose
const mongoose = require("mongoose");

//Import thư viện path
const path = require("path");

//Import schema
const drinkSchema = require("./app/models/drinkModel");
const voucherSchema = require("./app/models/voucherModel");
const orderSchema = require("./app/models/orderModel");
const userSchema = require("./app/models/userModel");

//Import router
const { drinkRouter } = require("./app/routes/drinkRouter");
const { voucherRouter } = require("./app/routes/voucherRouter");
const { userRouter } = require("./app/routes/userRouter");
const { orderRouter } = require("./app/routes/orderRouter");

//Khởi tạo 1 app express 
const app = express();

//Khai báo cổng chạy project
const port = 8000;

//sử dụng được body json
app.use(express.json());

//sử dụng body unicode để đọc tiếng Việt
app.use(express.urlencoded({
    extended:true
}));

//sử dụng static() để render các nội dung tĩnh (như ảnh, css)
app.use(express.static(__dirname + "/views"));

//kết nối với mongoose
mongoose.connect("mongodb://localhost:27017/CRUD_Pizza365", function (error){
    if (error) throw error;
    console.log("Successfully connected to MongoDB");
});



//***Main code starts here
//API, GET method
app.get("/", (req, res) => {
    console.log(__dirname);

    res.sendFile(path.join(__dirname + "/views/index.html"));
});




//sử dụng router
app.use("/", drinkRouter);
app.use("/", voucherRouter);
app.use("/", userRouter);
app.use("/", orderRouter);


app.listen(port, () => {
    console.log("App listening on port: ", port);
});
