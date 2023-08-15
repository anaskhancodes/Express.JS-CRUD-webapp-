import express from 'express'
let router = express.Router()

// import authapiv1 from './auth.mjs'

router.get('/login', (req, res) => {
  console.log("You're Login! => ", Date())
  res.send("You're Login! =>" + Date())
})


////////////////////////////////////////////////  

router.get('/SignUp', async(req, res) => {
  console.log("You're SignUp => ", Date())
  
  if (!req.body.firstName || !req.body.lastNmae || !req.body.email || !req.body.password) {
    res.status(403);
    res.send(`required parameters missing`);
    return;
}

const responseHTML = `<div style="color: white; margin-left: 20px;">Post is Created`;


try {
    const insertResponce = await col.insertOne({
        // id: nanoid(),
        title: req.body.title,
        text: req.body.text,
    });

    console.log("insertResponce => ", insertResponce);

    res.send(responseHTML);
} catch (error) {
    console.log("Error", error);
    res.status(500).send("Server error please try again later")
}


})

// router.use(authapiv1)

export default router 