const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dataLayer = require('./data/dataLayer');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static( path.join(__dirname,'data')))
app.use(express.json());
app.use(morgan('json'))

app.get('/calander', async (req, res, next) => {
  try {
    const data = await dataLayer.readJSON('./data/calander.json')
    res.send(data);
  }
  catch (ex) {
    res.send(ex);
    next();
  }
})

app.post('/calander', async (req, res, next) => {
  try {
    const original = await dataLayer.readJSON('./data/calander.json');
    original.push(req.body);
    await dataLayer.writeJSON('./data/calander.json', original);
    res.send(original);
  }
  catch (err) {
    res.send(err);
    next();
  }
})


app.listen(PORT, () => console.log('Listening on port ', PORT));