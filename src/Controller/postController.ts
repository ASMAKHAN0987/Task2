import { PostModel } from "../Models/Post"
export const createpost = async(req:any,res:any)=>{
    try{
       const newpost = new PostModel(req.body)
       const savePost = await newpost.save()
        res.status(200).send({
      messgae: "post created successfully",
    });
    }
    catch(err){
          res.status(500).json({err})
    }
}
export const getpost = async(req:any,res:any)=>{
    try{
       const post = await PostModel.findById(req.params.id)
       res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const getallpost = async(req:any,res:any)=>{
    try{
        const post = await PostModel.find({})
        if (!post) {
            return res.status(200).json({
              success: false,
              message: "No Blogs Found"
            });
          }
          return res.status(200).json({
            success: true,
            message: "All Blogs lists",
            posts: post
        });
     }
     catch(err){
      res.status(500).send({
          success: false,
          message: "internal server error",
        });
     }
}