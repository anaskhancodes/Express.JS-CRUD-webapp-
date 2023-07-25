import express from 'express'
let router = express.Router()



router.get('/login', (req, res) => {
  console.log("You're Login! => ", Date())
  res.send("You're Login! =>" + Date())
})

router.get('/SignUp', (req, res) => {
  console.log("You're SignUp => ", Date())
  res.send("You're SignUp => " + Date())
})

export default router 