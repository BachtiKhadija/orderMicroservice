const express=require('express');
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("bien conecté"));
app.use("/orders",require('./routes/OrdreRoutes'));

app.listen(3003,()=>{console.log('Order Service 3003')});