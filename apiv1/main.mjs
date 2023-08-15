import express from 'express';
let router = express.Router()


import authRouter from './auth.mjs'
import commentRouter from './Routes/comments.mjs'
import feedRouter from './Routes/feed.mjs'
import postRouter from './Routes/post.mjs'


// /api/v1/login
router.use(authRouter)
router.use( commentRouter)
router.use( postRouter)
router.use( feedRouter)

export default router;