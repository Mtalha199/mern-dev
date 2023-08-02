const Library =require("../Models/libraryModel")
const cloudinary = require("cloudinary");
const User=require("../Models/userModel")



const uploadBook=async(req,res)=>{
    try{
        const {bookName,bookAuthor,bookEdition}=req.body
        const file=req.files.bookPdf;
        const bookCover=req.files.bookCover;
    const bookPdfresult = await cloudinary.uploader.upload(file.tempFilePath);
    const bookCoverResult = await cloudinary.uploader.upload(bookCover.tempFilePath);
    const bookPdfUrl=bookPdfresult.secure_url;
    const bookCoverUrl=bookCoverResult.secure_url;
        const bookData=new Library({
            bookName,
            bookAuthor,
            bookEdition,
            bookPdf:bookPdfUrl,
            bookCover:bookCoverUrl
    
        })
        await bookData.save()
        res.status(200).send("Data saved")

    }catch(e)
    {
        res.status(404).send(e)
    }
}


const showbook=async(req,res)=>{
    const allBooks=await Library.find()
    res.status(200).send(allBooks)
}

const deleteBook=async(req,res)=>{
    console.log(req.params.id)
    const delBook=await Library.deleteOne({_id:req.params.id})
    if(!delBook)
    {
        res.status(404).send("Book Not found ")
    }
    else
    {
        res.status(201).send("Book Deleted")

    }
}
const searchId=async(req,res)=>{
    try{
        const {query}=req.query;
        
        const userExist=await User.findOne({name:query})
        if(!userExist)
        {
            console.log("USer")
            res.status(404).send(" User Not Exist")
        }
        else
        {
            res.status(200).send(userExist)

        }
    }catch(e)
    {
        res.status(404).send(e)
    }


}
module.exports={
    uploadBook,
    showbook,
    deleteBook,
    searchId,
}