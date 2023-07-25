
import express from 'express'
let router = express.Router()



//Get    //feed/:userId 
router.get('/feed/:userId', (req, res) => {
    console.log("This is FEED => ", Date())
    res.send("This is FEED => " + Date())
  })

export default router   