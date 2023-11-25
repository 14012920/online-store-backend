const route = require("express").Router();
const staticContentController = require("../controllers/staticContentController");
route.get("/catlist", staticContentController.get_category);
route.get("/heroSection", staticContentController.get_hero_section);

module.exports = route;