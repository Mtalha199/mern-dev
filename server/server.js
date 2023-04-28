const express=require('express');
const app=express();
const port=5000;
require('./DB/connection')
const user=require('./Models/userModel')









app.get('/',(req,res)=>{
res.send('This is over home page')
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})