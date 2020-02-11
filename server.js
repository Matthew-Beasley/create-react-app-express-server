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
    res.status(200).send(data);
  }
  catch (ex) {
    res.status(500).send(ex);
    next();
  }
})


app.post('/calander', async (req, res, next) => {
  try {
    const original = await dataLayer.readJSON('./data/calander.json');
    original.push(req.body);
    original.sort((a, b) => b.sortDate - a.sortDate);
    await dataLayer.writeJSON('./data/calander.json', original);
    res.status(200).send(original);
  }
  catch (err) {
    res.status(500).send(err);
    next();
  }
})


app.delete('/calander/:id', async (req, res, next) => {
  try {
    const original = await dataLayer.readJSON('./data/calander.json');
    const updated = original.filter(event => event.id !== req.params.id);
    updated.sort((a, b) => b.sortDate - a.sortDate);
    await dataLayer.writeJSON('./data/calander.json', updated);
    res.status(200).send(updated);
  }
  catch (err) {
    res.status(500).send(err);
    next();
  }
})


app.get('/user', async (req, res, next) => {
  try {
    const user = await dataLayer.readJSON('./data/user.json');
    res.status(200).send(user);
  }
  catch (err) {
    res.status(500).send(err);
  }
})


app.post('/user', async (req, res, next) => {
  try {
    dataLayer.writeJSON('./data/user.json', req.body);
    res.status(200).send(req.body)
  }
  catch (err) {
    res.status(500).send(err);
  }
})


app.get('/journal', async (req, res, next) => {
  try {
    const journal = await dataLayer.readJSON('./data/journal.json');
    res.status(200).send(journal);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
})


app.post('/journal', async (req, res, next) => {
  try {
    const original = await dataLayer.readJSON('./data/journal.json');
    const updated = [req.body, ...original];
    await dataLayer.writeJSON('./data/journal.json', updated);
    res.status(201).send(updated);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
})

app.listen(PORT, () => console.log('Listening on port ', PORT));