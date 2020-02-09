const express = require('express');
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(), path.join(__dirname,'public'))
app.use(express.json());
app.use(morgan())

app.get('/', (req, res, next) => {
  try {
    console.log(__dirname)
    //app.sendFile(path.join(__dirname, '../'))
    res.send('in get')
  }
  catch (ex) {
    res.send(ex);
    next();
  }
})


app.listen(PORT, () => console.log('Listening on port ', PORT));