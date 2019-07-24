const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const sesion = require('express-session');

const bodyParser = require('body-parser');
const flash = require('connect-flash');


// Ajustes
app.set('port', 3000);

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.html'
}));
app.set('views engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(sesion({
    secret: 'vidaymente',
    resave: true,
    saveUninitialized: true
}));

app.use(flash()); 


// Rutas
const routes = require('./routes/rutas.js');
app.use('/', routes); 


// Listening the Server
const port = 3000;
app.listen(port, console.log('Server started on port', app.get('port')));