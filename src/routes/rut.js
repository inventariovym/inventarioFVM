const express = require('express');
const ruta = express.Router();
const passport = require('passport'); 
const db = require('./database');
 
///RUTAS
ruta.get('/', (req, res) => {  //Muestra el login.html
    res.render('login.html', { title: 'Inventario'});
});

ruta.get('/navegacion', (req, res) => {  
    res.render('inicio.html');
});

///PETICIONES
ruta.post('/r', db.postSignIn );  //Regristro de usurios
ruta.post('/', db.postSignUp);


module.exports = ruta; 