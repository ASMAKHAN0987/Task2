import express from 'express';
import dotenv from 'dotenv';
import postroute from './Routes/posts'
import http from 'http'
dotenv.config()

import mongoose from 'mongoose';
import userouter from './Routes/auth';
import commentrouter from './Routes/commentroutes'
const app = express();
const server = http.createServer(app)
app.use(express.json());

server.listen(8080,()=>{
    console.log('Server listening on port 8080');
})
mongoose.Promise  = Promise;
mongoose.connect("mongodb+srv://khansworld890:CGFoo2Jy6kytlYzG@cluster0.anfl2ax.mongodb.net/mynewproject?retryWrites=true&w=majority");
mongoose.connection.on('error',(error:Error)=>console.log(error));
app.use('/api/auth',userouter);
app.use('/api/posts',postroute)
app.use('/api/comment',commentrouter)

