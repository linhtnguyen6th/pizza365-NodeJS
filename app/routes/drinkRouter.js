//Khai báo thư viện express
const express = require("express");

//Import drinkMiddleware
const { drinkMiddleware } = require("../middlewares/drinkMiddleware");
//Import course controller
const { createDrink, getAllDrinks, getDrinkById, updateDrinkbyDrinkId, deleteDrinkByDrinkId } = require("../controllers/drinkController");

//Khởi tạo Router
const drinkRouter = express.Router();

//sử dụng voucherMiddleware
drinkRouter.use(drinkMiddleware);

//C - Create drink data
drinkRouter.post("/drinks", createDrink);

//R - Get all drinks
drinkRouter.get("/drinks", getAllDrinks);

//R - Get all drink (different API)
drinkRouter.get("/devcamp-pizza365/drinks", getAllDrinks);

//R - Get a drink by drinkId
drinkRouter.get("/drinks/:drinkId", getDrinkById);

//U - Update a drink by drinkId
drinkRouter.put("/drinks/:drinkId", updateDrinkbyDrinkId);

//D - Delete a drink by drinkId
drinkRouter.delete("/drinks/:drinkId", deleteDrinkByDrinkId)


//export drink router thành 1 module
module.exports = { drinkRouter };