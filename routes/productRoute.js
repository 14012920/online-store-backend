const router = require("express").Router();
const productController = require("../controllers/productController");
const { upload } = require("../fileHelper");
router.post("/", upload.single("image"), productController.product_create);
router.get("/", productController.product_all);
router.get("/:productId", productController.product_details);
router.put("/:productId", productController.product_update);
router.get("/bycatid/:catId", productController.catWiseProduct);
router.delete("/:productId", productController.product_delete);
module.exports = router;