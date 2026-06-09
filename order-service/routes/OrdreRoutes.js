const router=require('express').Router();
const orderController=require('../controller/OrderController');
router.post("/create",orderController.create);
router.post("/cancel",orderController.cancel);

module.exports=router;


