
import express from 'express';
import { nanoid } from 'nanoid'
let router = express.Router()

// not recommended at all - server should be stateless
let posts = [
    {
        id: nanoid(),
        title: "Hello Evreyone",
        text: "Welcome Welcome"
    }
]

// POST    /api/v1/post
router.post('/post', (req, res, next) => {

    if (
        !req.body.title
        || !req.body.text
    ) {
        res.status(403);
        res.send(`required parameters missing`);
        return;
    }

    const responseHTML = `<div style="color: white; margin-left: 20px;">Post is Created`

    posts.unshift({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text,
    })

    res.send(responseHTML);
})
// GET     /api/v1/posts
router.get('/posts', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send(posts);
})

// GET     /api/v1/post/:postId
router.get('/post/:postId', (req, res, next) => {
    console.log('this is signup!', new Date());

    if (req.params.postId) {
        res.status(403).send(`post id must be a valid number, no alphabet is allowed in post id`)
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send(posts[i]);
            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);
})



router.put('/post/:postId', (req, res, next) => {

    if (!req.params.postId
        || !req.body.text
        || !req.body.title) {
        res.status(403).send("Post id must be valid");
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts[i] = {
                text: req.body.text,
                title: req.body.title,
            }
            res.send('post updated with id ' + req.params.postId);
            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);
})

// DELETE  /api/v1/post/:userId/:postId
router.delete('/post/:postId', (req, res, next) => {
    console.log("This Post is Delete => ", Date());

    if (!req.params.postId) {
        res.status(403).send("Post id must be valid");
    }

    for (let i = 0; i < posts.length; i++) {

        if (posts[i].id === req.params.postId) {


            posts.splice(i, 1);
            res.send("Post not found with this " + req.params.postId + " id");
            return;
        }
    }


    res.status(404).send("Post not found with this " + req.params.postId + " id");

})

export default router


