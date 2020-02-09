const express = require('express');
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static( path.join(__dirname,'public')))
app.use(express.json());
app.use(morgan('json'))

app.get('/', (req, res, next) => {
  try {
    /*
    console.log(path.join(__dirname, '..', 'public'))
    app.sendFile(path.join('index.html'))
    */
    res.send('<h1>In server</h1>')
  }
  catch (ex) {
    res.send(ex);
    next();
  }
})


app.listen(PORT, () => console.log('Listening on port ', PORT));