const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    mindThoughts:{
        type:String,
    },
    id:{
        type:String,
        required:true
    },
   
    name:{
        type:String
    },
    imageUrl:{
        type:String
    },
    like:{
        type: [String],
        default: [],
    },
    comment:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            userComment:{
                type:String
            }
        }
    ],
    timestamp:{
        type:Date,
        default:Date.now
}
})


const post=mongoose.model('post',postSchema);
module.exports=post;