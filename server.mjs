import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

// import authRouter from './routes/auth.mjs'
// import postRouter from './routes/post.mjs'
import apiv1RouterAuth from './apiv1/Routes/auth.mjs'
import apiv1Router from './apiv1/main.mjs'

import cookieParser from 'cookie-parser'
// import { decode } from 'punycode';


const __dirname = path.resolve();
const app = express()
app.use(express.json()); // body parser
app.use(cookieParser()); // cookie parser



// app.use("/api/v1", apiv1);





app.use("/api/v1", apiv1RouterAuth)


app.use((req, res, next) => { // JWT
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded: ", decoded);

    req.body.decoded = {
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    };

    next();

  } catch (err) {
    res.status(401).send({ message: "invalid token" })
  }
})

// /api/v1/unAuth

app.use("/api/v1", apiv1Router) // secure API's

// /static/vscode_windows.exe
app.use("/static", express.static(path.join(__dirname, 'static')))

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
