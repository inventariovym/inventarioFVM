const express = require('express');
const app = express(); 
const path = require('path');
const bodyParser = require('body-parser');
const sesion = require ('express-session'); 
const flash = require('connect-flash'); 
const passport = require('passport'); 

require('./routes/passport')(passport); 

// settings
app.set('port',3000);
app.use(bodyParser.json()); 
app.use(express.urlencoded({extended: false}));


//EJS
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); 
app.set('views engine', 'ejs'); 

app.use(express.static(path.join(__dirname, 'public'))); 

// routes
const routes = require('./routes/rut.js');
app.use('/', routes);

// middlewares
    
    app.use(sesion({
        secret : 'vidaymente', 
        resave : true, 
        saveUninitialized : true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

// listening the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));