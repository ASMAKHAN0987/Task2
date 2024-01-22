import express from 'express';
import { commentcreate, getAllComments, replytocomment, replytoreply } from '../Controller/commentController';
const router = express.Router();
router.post('/:postId/createcomment',commentcreate)
router.get('/:postId/getallcomments',getAllComments)
router.put('/:commentId/reply',replytocomment);
router.put('/:commentId/reply/:replyId',replytoreply)

export default router