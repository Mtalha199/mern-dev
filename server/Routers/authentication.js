const express=require('express');
const User=require('../Models/userModel')
const bycrypt=require('bcryptjs')
const router=express.Router();


    router.post('/signup',async(req,res)=>{
        try{    
            
            const {aridno ,cnic ,name , fathername ,phoneno , password}=req.body;
            if(!aridno || !cnic ||!name ||!fathername ||!phoneno ||!password)
            {
               return res.status(406).send("ALL field are required")
            }
           const userExist= await User.findOne({aridno:aridno})
           if(userExist)
           {
             return res.status(400).send("User already axist")
           }

            const bypass=await bycrypt.hash(password,10)

        const user=new User({aridno ,cnic ,name , fathername ,phoneno , password:bypass})
       await user.save();
       res.status(201).json({message:"User added successfully "})

        }
        catch(e){
            res.send(e)
        }
    })


    router.post("/login",async(req,res)=>{
        const {aridno,password}=req.body

        if(!aridno || !password){
            return res.status(406).send("All Field are Required")
        }
        const aridnoExist=await User.findOne({aridno})
       
        if(!aridnoExist)
        {
            return res.status(403).send("Invalid Arid no OR Password")
        }
        else{
            const matchpassword=await bycrypt.compare(password,aridnoExist.password) 
            if(matchpassword)
            {
                return res.send("User login Successfully")
            }
            else
            {
                return res.send("Invalid Arid no OR Password")
            }
            
        }
    })

module.exports=router;