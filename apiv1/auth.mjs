import express from 'express'
let router = express.Router()

import authRouter from './auth.mjs'

router.get('/login', (req, res) => {
  console.log("You're Login! => ", Date())
  res.send("You're Login! =>" + Date())
})

router.get('/SignUp', (req, res) => {
  console.log("You're SignUp => ", Date())
  res.send("You're SignUp => " + Date())
})

router.use(authRouter)

export default router 