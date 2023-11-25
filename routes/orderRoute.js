const route = require("express").Router();
const orderController = require("../controllers/orderController");
route.post("/saveOrder", orderController.save_order);
route.post("/getUserOrder", orderController.get_orderby_user);

module.exports = route;
