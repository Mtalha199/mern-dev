const Pages = require("../Models/pagesModel");
const post = require("../Models/postModel");
// const profile=require("../Models/profileModel")
const User = require("../Models/userModel");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
require("../Cloudinary/cloudinaryConfig");

const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { mindThoughts, id, name, like, comment } = req.body;
    const file = req.files.image;
    // let imageUrl = '';
    if (!file) {
      const data = new post({
        mindThoughts,
        id,
        name,
        like,
        comment,
      });

      console.log(data);
      await data.save();
      res.status(200).send("Data Saved");
    }
    // const result = await cloudinary.uploader.upload(file.tempFilePath);

    // const imageUrl = result.secure_url;
    // console.log(imageUrl);
    else {
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      imageUrl = result.secure_url;

      const data = new post({
        mindThoughts,
        id,
        name,
        imageUrl,
        like,
        comment,
      });
      await data.save();
      res.status(200).send("Data Saved");
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const showData = async (req, res) => {
  try {
    const { id } = req.body;
    const allData = await post.find({ id: id });
    res.send(allData);
  } catch (e) {
    res.status(404).send(e);
  }
};

const deletePost = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    await post.deleteOne({ _id: id });
    res.status(200).send("Deleted Post");
  } catch (e) {
    res.status(404).send(e);
  }
};

const profileImage = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const imageUrl = result.secure_url;
    const updatedProfile = await User.findOneAndUpdate(
      { _id: _id },
      [{ $set: { imageUrl: imageUrl } }],
      { new: true }
    );
    if (!updatedProfile) {
      res.status(404).send("user not founf");
    }
    res.status(200).send(updatedProfile);
  } catch (e) {
    res.status(406).send(e);
  }
};
const coverImage = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id)
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const imageUrl = result.secure_url;
    // console.log(imageUrl)
    const updateCover = await User.findOneAndUpdate(
      { _id: _id },
      [{ $set: { coverImageUrl: imageUrl } }],
      { new: true }
    );
    // console.log(updateCover)
    if (!updateCover) {
      res.status(404).send("User not found");
    }

    res.status(200).send(updateCover);
  } catch (e) {
    res.status(406).send(e);
  }
};

const showPostsInDashboard = async (req, res) => {
  try {
    const _id = req.params.id;
    const userExist = await User.findOne({ _id: _id });
    if (!userExist) {
      res.status(404).send("User Not found");
    }
    const friendsIds = userExist.friends;
    const friendData = Promise.all(
      friendsIds.map(async (item) => {
        const friendprofile = await User.find({ _id: item });
        const friendsPosts = await post.find({ id: item });
        // const pageProfile=await Pages.find({_id:item})
        // console.log(pageProfile)
        return { friendsPosts, friendprofile };
      })
    )
      .then((friendData, friendImage) => {
        const combinePosts = friendData.flat();
        res.status(200).send({ combinePosts, friendImage });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error fetching friend posts");
      });
  } catch (e) {
    res.status(404).send(e);
  }
};

const showProfileOnDashboardClick = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id)
    const allData = await post.find({ id: _id });
    const userExist = await User.findById({ _id: _id });
    // console.log(userExist)

    res.send({ allData, userExist });
    // const combineData=   allData.concat(userExist)
    // console.log(combineData)
    console.log(`combine:${allData},userdata${userExist}`);
  } catch (e) {
    res.status(404).send(e);
  }
};
const likeEntry = async (req, res) => {
  try{
    console.log(req.body);
    const { postId, likeUserId } = req.body;
    const newLikeUserId = [likeUserId];
    const updatelike = await post.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { like: newLikeUserId } },
      { new: true, multi: true }
    );
    if(!updatelike)
    {
      console.log("already liked photto ")
      res.status(201).send("You already liked")
    }
    console.log(updatelike.like)
    // console.log(updatelike);
    res.status(200).send("liked Photo")
  }
  catch(e)
  {
    res.status(500).send(e)
  }
}
const postComments=async(req,res)=>{
  try{
console.log(req.body)
const {postId,userId,userComment}=req.body;
const comment={userId,userComment}
// console.log(comment)
const updateComment=await post.findOneAndUpdate(
  {_id:postId},
  {$addToSet:{comment:comment}},
  {new:true,multi:true}
)
// console.log(updateComment)
res.status(200).send("Comment Posted")
  }catch(e)
  {
    res.status(500).send("Server Error")
  }

}
const showCommentOfPost=async(req,res)=>{
  try{
    // console.log(req.body)
    const _id = req.params.id;
    console.log(_id)
    const postExist = await post.findById(_id).populate({
      path: 'comment',
      populate: {
        path: 'userId',
        model: 'signup'
      }
    });
    console.log(postExist)

    const comments = postExist.comment.map(comment => ({
      user: {
        name: comment.userId.name,
        imageUrl: comment.userId.imageUrl,
        _id:comment.userId._id
      },
      comment: comment.userComment
    }));

    console.log(comments)
    res.status(200).send(comments);
    // res.status(200).send("data recieved")

    // const postExist=await post.findById({_id:_id}).populate('comment')
    // console.log(postExist)
    // const postExist=await post.findById(_id).populate({
    //   path: 'comment.userId',
    //   model: 'User'
    // })
    // console.log(postExist)

    // const commentData=postExist.comment
    // console.log(commentData)
    // const data=commentData.populate('userId')
    // console.log(data)
    // const withpopulate=await post.populate(commentData,{path:'userId'})
    // console.log(withpopulate)

    // res.status(200).send("recievedData")
  }catch(e)
  {
    res.status(500).send("Server Error")
  }

}
module.exports = {
  createPost,
  showData,
  deletePost,
  profileImage,
  coverImage,
  showPostsInDashboard,
  showProfileOnDashboardClick,
  likeEntry,
  postComments,
  showCommentOfPost,
}
