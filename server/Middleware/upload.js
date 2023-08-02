const path=require('path')
const multer=require('multer')
// console.log(multer)
const storage = multer.diskStorage({
    destination: function (req, file, cb)
        {
            console.log("req ala data a ",req.files)
             cb(null, 'uploads/')
        },
    filename: function (req,file, cb){
        console.log("file ala data a ",file)

         let ext=path.extname(file.originalname)
         cb(null,Date.now()+ext)
    }
   
})
var upload=multer({
        storage:storage,
        fileFilter:function(req,file,callback){
            if(
                file.mimetype=="application/pdf"
            ){
                callback(null,true)
            }else{
                console.log("only pdf file supported")
            }
        }
})

module.exports=upload;