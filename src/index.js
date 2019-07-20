const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const override = require('method-override');
const sesion = require('express-session');

const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');


// Ajustes
app.set('port', 3000);
//app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.html'
}));
app.set('views engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(override('_method'));
app.use(sesion({
    secret: 'vidaymente',
    resave: true,
    saveUninitialized: true
}));

// Rutas
const routes = require('./routes/rutas.js');
app.use('/', routes);

// listening the Server
const port = 3000;
app.listen(port, console.log('Server started on port', app.get('port')));