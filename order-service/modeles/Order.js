const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    userId:{type:String},
    productId:{type:String},
    quantity:{type:int},
    status:{
        type:String,
        default:"CREATED",
    }
});
module.exports=mongoose.model("Order",orderSchema);