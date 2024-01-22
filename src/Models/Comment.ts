import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema =  new mongoose.Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    userId: {
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    replies:[{
        userId: {
            type:String,
            required:true,
        },
        commentId: {
            type:Schema.Types.ObjectId,
            required:true,
        },
        reply:{
            type:String,
            required:true
        },
        replyanother:[{
                userId: {
                    type:String,
                    required:true,
                },
                commentId:{
                    type:String,
                    required:true
                },
                replyId: {
                    type:Schema.Types.ObjectId,
                    required:true,
                },
                reply:{
                    type:String,
                    required:true
                },
           }]
}]  

})
export const CommentModel  = mongoose.model('Comment',commentSchema)