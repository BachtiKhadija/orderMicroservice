const router = require("express").Router();
const controller = require("../controller/productController");
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
module.exports = router;