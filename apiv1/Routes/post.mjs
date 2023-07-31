
import express from 'express';
import { nanoid } from 'nanoid';
import { client } from './../../mongobd.mjs'

const db = client.db("CRUD_db");

const col = db.collection("posts");

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
router.post('/post', async (req, res, next) => {

    if (
        !req.body.title
        || !req.body.text
    ) {
        res.status(403);
        res.send(`required parameters missing`);
        return;
    }

    const responseHTML = `<div style="color: white; margin-left: 20px;">Post is Created`



    const insertResponce = await col.insertOne({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text,
    });

    console.log("insertResponce => ", insertResponce)



    res.send(responseHTML);
})



// GET     /api/v1/posts
// router.get('/posts', (req, res, next) => {

//     res.send(posts);
// })


router.get('/posts', async(req, res, next) => {
    try {
        const cursor = col.find({}).sort({ timestamp: -1 });
        let results = (await cursor.toArray()).reverse();

        console.log(results);
        res.send(results);
    } catch (error) {
        console.error(error);
    }
});




// GET     /api/v1/post/:postId
router.get('/post/:postId', (req, res, next) => {


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



// router.put('/post/:postId', async(req, res, next) => {
  
//     const postId = req.params.postId;
//     const { post } = req.body;

//     if (!post) {
//         res.status(403).send('Required parameters missing. Please provide both "post" and "price".');
//         return;
//     }

//     try {
//         const updateResponse = await col.updateOne({ id: postId }, { $set: { post } });

//         if (updateResponse.matchedCount === 1) {
//             res.send(`post with id ${postId} updated successfully.`);
//         } else {
//             res.send('post not found with the given id.');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// });



router.delete('/post/:postId', async(req, res, next) => {
    const postId = req.params.postId;

    try {
        const deleteResponse = await col.deleteOne({ id: postId });
        if (deleteResponse.deletedCount === 1) {
            res.send(`post with id ${postId} deleted successfully.`);
        } else {
            res.send('Post not found with the given id.');
        }
    } catch (error) {
        console.error(error);
    }
});


export default router


