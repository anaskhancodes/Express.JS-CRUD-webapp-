
import express from 'express'



let router = express.Router();





//Get    /api /v1/comment/:postId/:commentId
router.get('/api/v1/comment/:userId/:commentId', (req, res) => {
  console.log("Comment created => ", Date())
  res.send("Comment created => " + Date())
})




//Get    /api /v1/comments/:postId
router.get('/comments/:postId', (req, res) => {
  console.log("Comments created => ", Date())
  res.send("Comments created => " + Date())
})





//Put    //comment/:postId/:commentId 
router.put('/comment/:postId/:commentId', (req, res) => {
  console.log("Comment abdate => ", Date())
  res.send("Comment abdate => " + Date())
})



//Delete    //comment/:postId/:commentId
router.delete('/comment/:postId/:commentId', (req, res) => {
  console.log("Comment is Delete => ", Date())
  res.send("Comment is Delete => " + Date())
})

export default router