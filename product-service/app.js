const express=require('express');
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("bien conecté"));
app.use("/products",require('./routes/productRoutes'));

app.listen(3002,()=>{console.log('User Service 3002')});