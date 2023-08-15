
import express from 'express';
// import { nanoid } from 'nanoid';
import { client } from './../../mongobd.mjs'
import { ObjectId } from 'mongodb'

const db = client.db("CRUD_db");

const col = db.collection("posts");

let router = express.Router()

// not recommended at all - server should be stateless
let posts = [
    {
        // id: nanoid(),
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
});


router.get('/posts', async (req, res, next) => {
    try {
        //  
        const cursor = col.find({})
        .sort({ timestamp: -1 })
        .limit(100);
        // 
        let results = (await cursor.toArray()).reverse();

        console.log("result ", results);
        res.send(results);
    } catch (error) {
        console.log("Error", error);
        res.status(500).send("Server error please try again later")
    }
});




// GET     /api/v1/post/:postId
router.get('/post/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid Post id`)
        return;
    }


    try {

        let result = await col.findOne({ _id: new ObjectId(req.params.postId) })//.sort({ timestamp: -1 }).reverse();

        console.log("result ", result); // [{...}]   
        res.send(result);
    } catch (error) {
        console.log("Error", error);
        res.status(500).send("Server error please try again later")
    }
})





// PUT     /api/v1/post/:postId
router.put('/post/:postId', async (req, res, next) => {
    const postId = req.params.postId;

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid Post id`)
        return;
    }

    let dataUpdated = {};

    if (req.body.title) { dataUpdated.title = req.body.title };
    // 
    if (req.body.text) { dataUpdated.text = req.body.text };

    try {
        const updateResponse = await col.updateOne( { _id: new ObjectId( req.params.postId ) },

            { $set: dataUpdated }
        );

        if (updateResponse.modifiedCount === 1) {
            res.send('Post updated');
        } else { 
            res.send('Post not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error please try again later')
    }
});



router.delete('/post/:postId', async (req, res, next) => {
    const postId = req.params.postId;

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid Post id`)
        return;
    }

    try {
        const deleteResponse = await col.deleteOne( { _id: new ObjectId( req.params.postId ) });

        console.log('deleteResponse', deleteResponse)

        if (deleteResponse.deletedCount === 1) {
            res.send('Post delete');
        } else { 
            res.send('Post not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error please try again later')
    }
});


export default router


