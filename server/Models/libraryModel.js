const mongoose=require('mongoose')
const uploadBookSchema=new mongoose.Schema(
    {
        bookName:{
            type:String
        },
        bookAuthor:{
            type:String
        },
        bookEdition: {
            type:String
        },
       
        bookPdf:{
            type:String,
        },
         bookCover:{
            type:String
        },

    }
    
)
const Library= mongoose.model('library',uploadBookSchema)
    module.exports=Library;