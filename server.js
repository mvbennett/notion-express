require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const cors = require('cors');
const { response } = require('express');

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.get('/', (req,res) => {
  res.send({message: "Hello World!"})
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get('/message', (req,res) => {
  res.send({message: process.env.MESSAGE})
});

app.get('/search/:book', async (req,res) => {
  const book = req.params.book;
  let results;
  await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${process.env.BOOK_API}&language=en`)
  .then(response => response.json())
  .then((data) => {
    results = data;
  })
  res.send({yourQuery: results});
})
