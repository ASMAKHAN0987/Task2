import { CommentModel } from "../Models/Comment";


export const commentcreate = async(req:any,res:any)=>{
    const id = req.params.postId
    const {comment, userId} = req?.body;  
    try{
           if(id){
            const createcomment = new CommentModel({
                postId: id,
                comment,
                userId
            })
            await createcomment.save()
            res.status(201).json(createcomment);
           }
           else{
            res.status(404).json({message: "Comment with this post id is not found"})
           }
      }
      catch(err){

      }
}
export const getAllComments = async(req:any,res:any)=>{
   const id = req.params.postId;
    try{
        if(id){
            const post = await CommentModel.find({postId:id})
            res.json(post)
        }else{
            res.status(404).json({message: "Comment with this post id is not found"})
        }
   }
   catch(err){
        res.status(401).json({message:'problem with Getting posts from server',err:err})
   }
}
export const replytocomment = async(req:any,res:any)=>{
    const comment_Id = req.params?.commentId;
    if(comment_Id){
        const reply = {
            commentId:comment_Id,
            userId:req.body?.userId,
            reply:req.body?.reply
        }
    const newComment =  await CommentModel.findByIdAndUpdate({_id:comment_Id},{$push:{replies:reply}},{new: true})
    res.json(newComment)
    }else{
        res.status(404).json({message:"comment with this post id is not found"})
    }

}
export const replytoreply = async (req:any,res:any)=>{
    const commentId = req.params.commentId
    const replyId = req.params.replyId
    if(commentId && replyId){
        const replyToReply = {
            userId: req.body?.userId,
            commentId: commentId,
            replyId: replyId,
            reply:req.body?.reply
        }
        try {
           const updatedComment = await CommentModel.findOneAndUpdate(
            { _id: commentId, 'replies._id': replyId },
            { $push: { 'replies.$[outer].replyanother': replyToReply } },
            {
              new: true,
              arrayFilters: [{ 'outer._id': replyId }],
            }
          );
          if (!updatedComment) {
            return res.status(404).json({ message: 'Comment or reply not found' });
          }
    
          res.json(updatedComment);
        }
        catch(err){
            res.status(500).json({ message: 'Internal Server Error', error: err });
        }
    }
    else{
        res.status(400).json({ message: 'Invalid commentId or replyId' });

    }
}