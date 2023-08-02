const cloudinary = require("cloudinary");
require("../Cloudinary/cloudinaryConfig");
const Pages =require("../Models/pagesModel")
const User=require("../Models/userModel")
const Post=require("../Models/postModel")

const createPage=async(req,res)=>{
    try
    {
          const {pagename}=req.body;
        //   console.log(pagename)

          const file = req.files.Image;
          const result = await cloudinary.uploader.upload(file.tempFilePath);
          const profileImageUrl = result.secure_url;

          const coverFile=req.files.coverImage;
          const coverResult=await cloudinary.uploader.upload(coverFile.tempFilePath);
          const coverImageUrl=coverResult.secure_url;


          if(!pagename)
          {
            res.status(401).send("Page Name is required")
          }
          else{
            const page=new Pages({
                pagename,
                profileImageUrl,
                coverImageUrl
              })
    
               await page.save()
               res.status(201).send("Page Created")
          }
         
    }catch(e)
    {
        res.status(404).send(e)
    }
  
}
const allPages=async(req,res)=>{
    try
    {
       const pages= await Pages.find()
       {
        res.status(201).send(pages)
       }
    }catch(e)
    {
        res.status(404).send(e)
    }
}

const deletePage=async(req,res)=>{
    try{
        // console.log(req.params.id)
        const delPage=await Pages.findOneAndDelete({_id:req.params.id})
        if(!delPage)
        {
            res.status(401).send("Page not Deleted")
        }
        res.status(200).send("Page Deleted")
    }catch(e)
    {
        res.status(404).send(e)
    }
    
}

const specificPage=async(req,res)=>{
    // console.log(req.params.id)
    const pageData= await Pages.findOne({_id:req.params.id})
    if(!pageData)
    {
        res.status(401).send("Page Not Exist")
    }
    res.status(201).send(pageData)
    // console.log(pageData)

}
const userLiked=async(req,res)=>{
// console.log(req.body)
const {_id,pageId}=req.body;
const newPageId=[pageId]
// console.log(_id)
// console.log(pageId)
const userExist=await User.findOneAndUpdate(
    {_id:_id},
    {$addToSet:{likedPage:newPageId}},
    {new:true,multi:true}
    )
console.log(userExist)
if(!userExist)
{
    res.status(402).send("User Not Exist")
}
res.status(200).send("Liked")
}

const showPagesData=async(req,res)=>{
// console.log(req.params.id)
const userExist=await User.findOne({_id:req.params.id})
// console.log(userExist)
// console.log(userExist.friends)
const likedPages=userExist.likedPage;
// console.log(likedPages)
const allPosts=Promise.all(likedPages.map(async(item)=>{
  const allPost=await Post.find({id:item})
  const pageProfile=await Pages.find({_id:item})
  return{allPost,pageProfile}
})).then((allPosts)=>{
res.status(200).send(
    {
        allPosts,
        
    })
}
).catch((e)=>{
    res.status(404).send(e)
})

// const pagesPost=
}


module.exports={
    createPage,
    allPages,
    deletePage,
    specificPage,
    userLiked,
    showPagesData,
}