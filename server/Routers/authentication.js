const express=require('express');
const registrationController= require("../Controllers/registrationController");
const forgotController=require("../Controllers/forgotController")
const postController=require("../Controllers/postController")
const friendController=require("../Controllers/friendController")
const PagesController=require("../Controllers/PagesController")
const libraryController=require("../Controllers/libraryController")

const router=express.Router();

                    
    router.post('/signup',registrationController.signup)

    router.post("/login",registrationController.login)

    router.post("/checkUser",registrationController.checkUsers)

    router.post("/checkEmail", forgotController.checkEmail)

    router.post("/checkOtp",forgotController.checkOtp)

    router.post("/updateNewPassword",forgotController.updateNewPassword)

    router.post("/post/createpost",postController.createPost)

    router.post("/post/showPosts",postController.showData )

    router.post("/post/deletePost",postController.deletePost)

    router.put("/profileImage/:id",postController.profileImage)

    router.put("/coverImage/:id",postController.coverImage)

    router.get("/allPosts/:id",postController.showPostsInDashboard)

    router.get("/userProfile/:id",postController.showProfileOnDashboardClick)

    router.put("/likeUser",postController.likeEntry)

    router.post("/comment/userComment",postController.postComments)

    router.get("/comment/postOfComment/:id",postController.showCommentOfPost)

    router.get("/friends/:id",friendController.friends)

    router.post("/friends/friendRequest",friendController.sendFriendRequest)

    router.get("/requestedFriend/:id",friendController.showRequestedData)

    router.post("/responseRequest",friendController.responseRequest)

    router.get("/allFriends/:id",friendController.allFriends)

    router.post("/createPage",PagesController.createPage)

    router.get("/allPages",PagesController.allPages)

    router.post("/deletePage/:id",PagesController.deletePage)

    router.get("/page/:id",PagesController.specificPage)

    router.post("/likePage",PagesController.userLiked)

    router.get("/allpages/:id",PagesController.showPagesData)

    router.post("/uploadBook",libraryController.uploadBook)

    router.get("/showBooks",libraryController.showbook)
    
    router.put("/deleteBook/:id",libraryController.deleteBook)
    
    router.get("/search",libraryController.searchId)


  
    




module.exports=router;