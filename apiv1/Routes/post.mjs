
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

    const responseHTML = `<div style="color: white; margin-left: 20px;">Post is Created`;


    try {
        const insertResponce = await col.insertOne({
            id: nanoid(), 
            title: req.body.title,
            text: req.body.text,
        });

        console.log("insertResponce => ", insertResponce);

        res.send(responseHTML);
    } catch (error) {
        console.log("Error", error );
        res.status(500).send("Server error please try again later")
    }
});


router.get('/posts', async (req, res, next) => {
    try {
        const cursor = col.find({}).sort({ timestamp: -1 });
        let results = (await cursor.toArray()).reverse();

        console.log("result ",results);
        res.send(results);
    } catch (error) {
        console.log("Error", error );
        res.status(500).send("Server error please try again later")
    }
});




// GET     /api/v1/post/:postId
router.get('/post/:postId', async (req, res, next) => {


    if (req.params.postId) {
        res.status(403).send(`post id must be a valid number, no alphabet is allowed in post id`)
    }


    try {
        const cursor = col.find({_id: req.params.postId}).sort({ timestamp: -1 });
        let results = (await cursor.toArray()).reverse();

        console.log("result ",results);
        res.send(results);
    } catch (error) {
        console.log("Error", error );
        res.status(500).send("Server error please try again later")
    }
})





// PUT     /api/v1/post/:postId
router.put('/post/:postId', async (req, res, next) => {
    const postId = req.params.postId;

    if (!postId || !req.body.text || !req.body.title) {
        res.status(403).send("Post id must be valid and title/text must be provided.");
        return;
    }

    try {
        const updateResponse = await col.updateOne(
            { id: postId },
            {
                $set: {
                    title: req.body.title,
                    text: req.body.text,
                }
            }
        );

        if (updateResponse.modifiedCount === 1) {
            res.send('Post updated with id ' + postId);
        } else {
            res.send('Post not found with id ' + postId);
        }
    } catch (error) {
        console.error(error);
    }
});



router.delete('/post/:postId', async (req, res, next) => {
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


