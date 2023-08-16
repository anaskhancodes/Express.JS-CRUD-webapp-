import express from 'express'
let router = express.Router()
import jwt from 'jsonwebtoken'
import { client } from './../../mongobd.mjs'

import {
  stringToHash,
  varifyHash
} from "bcrypt-inzi";

const col = client.db("auth").collection("authuser")


// import authapiv1 from './auth.mjs'

router.post('/login', async (req, res) => {

  if (!req.body.email || !req.body.password) {
    res.status(403)
    res.send(`required perameter missing `)
    return;
  }

  req.body.email = req.body.email.tolowerCase;

  try {

    let result = await col.findOne({ email: req.body.email })
    if (!result) {
      res.status(403).send({ messagea: "email or password is incorrect" });
      return;

    } else {
      //user mil raha he 
      const isMatch = await varifyHash(req.body.password, result.password);

      if (isMatch) {

        const token = jwt.sign({
          isAdmin: false,
          firstName: result.firstName,
          lastName: result.lastName,
          email: req.body.email,

        }, Process.env.SECRET, {
          expiresIn: '24h'
        });

        res.cookie('token', token, {
          httpOnly: true,
          secure: true
        });

        res.send({ message: 'login sucessfull' })
        return;
      }

      else {
        res.status(401).send({ message: "incorect password or email" })
        return;
      }
    }
  }
  catch (e) {
    console.log("error in getting data", e)
  }
});







router.post('/singup ', async (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {

    res.status(403);
    res.send("require perameter is missing ")
    return;
  }

  req.body.email = req.body.email.tolowerCase();

  try {

    let result = await col.findOne({ email: req.body.email });

    if (!result) {

      const passwordHash = await stringToHash(req.body.password);

      const insertResponse = await col.insertOne(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: passwordHash,
          createdOn: new Date()
        }
      );
    }
  }
  catch (e) {
    res.status(500).send({
      mesaage: 'SERVER ERROR'
    })

  }


})

export default router