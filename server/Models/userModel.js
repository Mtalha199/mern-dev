const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    aridno:{
        type:String,
        requierd:true
    },
    cnic:{
        type:Number,
        requierd:true

    },
    name:{
        type:String,
        requierd:true
    },
    fathername:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        requierd:true
    },
    password:{
        type:String,
        required:true
    }
})
const User= mongoose.model('signup',userschema)
module.exports=User;