//import thư viện mongoose
const mongoose = require("mongoose");

//import models
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");



//Call API
//C - Create order and upate to user by userId
const createOrderOfUser = (req, res) => {
    //B1: Thu thập dữ liệu
    let userId = req.params.userId;
    let body = req.body;

    //B2: Validate dữ liệu
    //userId
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: `User ID is invalid`
        });
    };
    //body
    //orderCode
    if(!body.orderCode) {
        return res.status(400).json({
            message: `Order Code is required`
        });
    };
    //pizzaSize
    if(!body.pizzaSize) {
        return res.status(400).json({
            message: `Pizza Size is required`
        });
    };

    //status
    if(!body.status) {
        return res.status(400).json({
            message: `Status is required`
        });
    };

    //B3: Gọi model để xử lý dữ liệu
    let newOrderData = {
        _id: mongoose.Types.ObjectId(),
        orderCode: body.orderCode,
        pizzaSize: body.pizzaSize,
        pizzaType: body.pizzaType,
        voucher: body.voucher,
        drink: body.drink,
        status: body.status
    };

    orderModel.create(newOrderData, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        } else {
            userModel.findByIdAndUpdate(userId,
                {
                    $push: { orders: data._id }
                },
                (error, updatedUser) => {
                    if(error) {
                        return res.status(500).json({
                            message: error.message
                        });
                    } else {
                        return res.status(201).json({
                            message: `Create order successfully. UserID: ${userId}`,
                            orders: data
                        });
                    };
                }
            );
        };
    });
};

//C - Create order, sử dụng userModel để kiểm tra user bằng email
const createOrder = (req, res) => {
    //B1: Thu thập dữ liệu
    let body = req.body;

    //tạo random orderCode
    let orderCodeRandom = Math.random().toString(36).substring(2,12);
    body.orderCode = orderCodeRandom;
    //B2: Validate dữ liệu
    //userModel
    //fullName
    if (!body.fullName) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Full name is required"
        })
    }
    //email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
        return res.status(400).json({
            message: `Email is invalid`
        });
    };
    //address
    if (!body.address) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Address is required"
        })
    }
    //phone
    if (!body.phone) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Phone number is required"
        })
    }

    //oderModel
    //pizzaSize
    if (!body.pizzaSize) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Pizza Size is required"
        })
    }
    //pizzaType
    if (!body.pizzaType) {
        return res.status(400).json({
                status: "Error 400: Bad request",
                message: "Pizza Type is required"
        })
    }
    //voucher
    // if (!body.voucher) {
    //     return res.status(400).json({
    //         status: "Error 400: Bad request",
    //         message: "Voucher is required"
    //     })
    // }
    //drink
    // if (!body.drink) {
    //     return res.status(400).json({
    //         status: "Error 400: Bad request",
    //         message: "Drink is required"
    //     })
    // }
    //status
    if (!body.status) {
        return res.status(400).json({
                status: "Error 400: Bad request",
                message: "Status is required"
        })
    }

    //B3: Gọi model xử lý dữ liệu
    //Sử dụng userModel, dùng email để kiểm tra user có tồn tại không
    userModel.findOne({email: body.email}, (errorFindUser, userExisted) => {
        if(errorFindUser) {
            return res.status(500).json({
                message: errorFindUser.message 
            });
        } else {
            //nếu user chưa tồn tại
            if(!userExisted) {
                //tạo mới 1 user
                let newUser = {
                    _id: mongoose.Types.ObjectId(),
                    fullName: body.fullName,
                    email: body.email,
                    address: body.address,
                    phone: body.phone
                };

                userModel.create(newUser, (errorCreatedUser, createdUser) => {
                    if(errorCreatedUser) {
                        return res.status(500).json({
                            message: errorCreatedUser.message
                        });
                    } else {
                        //tạo order mới với user mới vừa tạo
                        let newOrder = {
                            _id: mongoose.Types.ObjectId(),
                            orderCode: orderCodeRandom,
                            pizzaSize: body.pizzaSize,
                            pizzaType: body.pizzaType,
                            voucher: body.voucher,
                            drink: body.drink,
                            status: body.status
                        };

                        orderModel.create(newOrder, (errorCreatedOrder, createdOrder) => {
                            if(errorCreatedOrder) {
                                return res.status(500).json({
                                    message: errorCreatedOrder.message
                                });
                            } else {
                                userModel.findByIdAndUpdate(createdUser._id,
                                    {
                                        $push: { orders: createdOrder._id }
                                    })
                                    .populate("orders")
                                    .exec((error, data) => {
                                        if (error) {
                                            return res.status(500).json({
                                                message: error.message
                                            });
                                        } else {
                                            return res.status(201).json({
                                                message: 'Create a new user and order successfully',
                                                data: createdOrder
                                            });
                                        };
                                    });
                            };
                        });
                    };
                });
            } else {
                // nếu đã tồn tại user thì tạo mới 1 order với user đó
                let newOrder = {
                    _id: mongoose.Types.ObjectId(),
                    orderCode: orderCodeRandom,
                    pizzaSize: body.pizzaSize,
                    pizzaType: body.pizzaType,
                    voucher: body.voucher,
                    drink: body.drink,
                    status: body.status
                };
                //tạo mới order với user đó
                orderModel.create(newOrder, (errorCreatedOrder, createdOrder) => {
                    if(errorCreatedOrder) {
                        return res.status(500).json({
                            message: errorCreatedOrder.message
                        });
                    } else {
                        userModel.findByIdAndUpdate(userExisted._id,
                            {
                                $push: { orders: createdOrder._id }
                            })
                            .populate("orders")
                            .exec((error, data) => {
                                if (error) {
                                    return res.status(500).json({
                                        message: error.message
                                    })
                                } else {
                                    return res.status(201).json({
                                        message: 'Create new order successfully',
                                        data: createdOrder
                                    });
                                };
                            });
                    };
                });
            };
        };
    });
}; 

//R - Get all orders from user by userId
const getAllOrderOfUser = (req, res) => {
    //B1: Thu thập dữ liệu userId từ req
    let userId = req.params.userId;
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: `User ID is invalid`
        });
    };

    //B3: Gọi model xử lý dữ liệu
    userModel.findById(userId)
    .populate("orders")
    .exec((error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        } else {
            return res.status(200).json({
                message: `Get all orders of user successfully`,
                orders: data
            });
        };
    });
};

//R - Get one order by orderId
const getOrderById = (req, res) => {
    //B1: Thu thập dữ liệu
    let orderId = req.params.orderId;
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            message: `Order ID is invalid`
        });
    };

    //B3: Gọi model để xử lý dữ liệu
    orderModel.findById(orderId, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Get order successfully. Order ID: ${orderId}`,
            orders: data
        });
    });
};

//U - Update one order by orderId
const updateOrderById = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    let orderId = req.params.orderId;
    let body = req.body;

    //B2: Validate dữ liệu
    //orderId
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            message: `Order ID is invalid`
        });
    };
    //body
    //orderCode
    if(body.orderCode !== undefined && !body.orderCode) {
        return res.status(400).json({
            message: `Order Code is required`
        });
    };
    //pizzaSize
    if(body.pizzaSize !== undefined && !body.pizzaSize) {
        return res.status(400).json({
            message: `Pizza Size is required`
        });
    };

    //status
    if(body.status !== undefined && !body.status) {
        return res.status(400).json({
            message: `Status is required`
        });
    };

    //B3: Gọi model xử lý dữ liệu
    let orderUpdate = {
        orderCode: body.orderCode,
        pizzaSize: body.pizzaSize,
        status: body.status
    };

    orderModel.findByIdAndUpdate(orderId, orderUpdate, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        };

        return res.status(200).json({
            message: `Update order successfully. Order ID: ${orderId}`,
            orders: data
        });
    });
};

//D - Delete one order by orderId
const deleteOrderById = (req, res) => {
    //B1: Thu thập dữ liệu từ req
    let orderId = req.params.orderId;
    let userId = req.params.userId;
    //B2: Validate dữ liệu
    //orderId
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            message: `Order ID is invalid`
        });
    };
    //userId
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: `User ID is invalid`
        });
    };

    //B3: Gọi model để xử lý dữ liệu
    orderModel.findByIdAndDelete(orderId, (error, data) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        } else {
            //sau khi xóa 1 order khỏi collection thì cần xoát thêm orderId trong user chứa nó
            userModel.findByIdAndUpdate(userId,
                {
                    $pull: { orders: orderId }
                },
                (error, updatedUser) => {
                    if(error) {
                        return res.status(500).json({
                            message: error.message
                        });
                    } else {
                        return res.status(204).json({
                            message: `Delete order successfully. Order ID: ${orderId}`
                        });
                    }
                }
            );
        };
    });
};



//export orderController thành 1 module
module.exports = {  
    createOrderOfUser,
    createOrder,
    getAllOrderOfUser,
    getOrderById,
    updateOrderById,
    deleteOrderById
};