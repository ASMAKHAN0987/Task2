import express from 'express';
import { createpost, getallpost, getpost } from '../Controller/postController';
// import { verifyToken } from '../Middleware/VerifyToken';
const router = express.Router();
router.post('/createpost',createpost)
router.get('/getpost/:id',getpost)
router.get('/postall',getallpost)

export default router