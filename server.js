if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
  }

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const indexPage = require('./routes/index');

const mongoose = require('mongoose');
const app = express();

//connecting to our MongoDB DataBase
const uri = process.env.DATABASE_URL;

mongoose.connect(uri, {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    
    const db = mongoose.connection;
    db.once('open', () =>{
        console.log('MongoDB connnection established successfully');
    });
    db.on('error', (err) => {
        console.log('Mongodb connection error:' + err);
    })
   db.on('Disconnected', () =>{
       console.log('MongoDB is disconnected');
   });

//setting the templating engine and layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');


//MiddleWares for our Application
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexPage);

const port = process.env.Port || 3000;

app.listen(port, () => {
    console.log('The app is running on port:' + port);
});

