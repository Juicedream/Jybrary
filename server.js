if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
// using MVC structure

app.set('view engine', 'ejs'); //the view engine
app.set('views', __dirname + '/views'); //the view folder 
app.set('layout', 'layouts/layout'); //for layout file to avoid repetition of code.

app.use(expressLayouts); //using express layouts
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose Database Successfully'));

app.use('/', indexRouter); //the index js router file from routes folder


app.listen(process.env.PORT || 3000, () => {console.log('server started....')});


