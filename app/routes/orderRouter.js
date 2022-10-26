//khai báo thư viện express
const express = require("express");
//import reviewMidđleware
// const orderMiddleware = require("../middlewares/orderMiddleware");
//import review controller
const { createOrderOfUser, createOrder, getAllOrderOfUser, getOrderById, updateOrderById, deleteOrderById } = require("../controllers/orderController");

//khởi tạo router
const orderRouter = express.Router();


//sử dụng middleware
// orderRouter.use(orderMiddleware);

//Call API
//C - Create order
orderRouter.post("/users/:userId/orders", createOrderOfUser);

//C - Create order sử dụng userModel tìm kiếm user qua email
orderRouter.post("/devcamp-pizza365/orders", createOrder);


//R - Get all order from user by userId
orderRouter.get("/users/:userId/orders", getAllOrderOfUser);

//R - Get one order by orderId
orderRouter.get("/orders/:orderId", getOrderById);

//U - Update one order by orderId
orderRouter.put("/orders/:orderId", updateOrderById);

//D - Delete ne order by orderId
orderRouter.delete("/users/:userId/orders/:orderId", deleteOrderById);



//export order router thành 1 module
module.exports = { orderRouter };