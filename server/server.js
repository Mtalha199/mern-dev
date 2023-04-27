const express=require('express');
const app=express();
const port=5000;
const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/Talksians",{
    family:4
}).then(()=>{
    console.log("Connected to DataBase")
}).catch((err)=>{
    console.log(err)
})



app.get('/',(req,res)=>{
res.send('This is over home page')
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})