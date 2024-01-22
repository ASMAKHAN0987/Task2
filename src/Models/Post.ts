import mongoose, { Schema } from 'mongoose'

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,  
    },
    userId:{
        type:String,
        required:true,  
    }
})

export const PostModel  = mongoose.model('Post',PostSchema)