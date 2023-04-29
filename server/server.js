const express=require('express');
const app=express();
const port=5000;
require('./DB/connection')
app.use(express.json());
app.use(require('./Routers/authentication'))





app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})