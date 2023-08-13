import express from 'express'
import path from 'path';
const __dirname = path.resolve();
const app = express()
app.use(express.json()); // body parser

////////////////////////////////////////////
// app.use(cors())

import apiv1Router from './apiv1/main.mjs'

app.use((req, res, next) => { // JWT
  let token = "valid";
  if (token === "valid"){
    next();

  }else{
    res.send({message: "Invalid token"})
  }
})


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
