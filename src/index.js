const express = require('express');
const app = express(); 
const path = require('path');
const bodyParser = require('body-parser');


// settings
app.set('port',3000);
app.use(bodyParser.json()); 
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json()); 

//EJS
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile); 
app.set('views engine', 'ejs'); 


// routes
const routes = require('./routes/rut.js');
app.use('/', routes);

// middlewares
app.use(express.static(path.join(__dirname, 'public'))); 

// listening the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));