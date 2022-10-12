const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

app.use(express.json());

require('./routes/get')(app)
require('./routes/post')(app)
require('./routes/delete')(app)

app.listen(PORT, (err)=>{
  console.log(err||"Listening on port: "+PORT)
})