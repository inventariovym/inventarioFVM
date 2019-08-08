const express = require('express');
const ruta = express.Router();
const db = require('../database');
var datos = []; 

ruta.get('/', (req, res) => {  //Login
    if (req.session.username) {
        datos=[];
        res.redirect('/navegacion');
        
    } else {
        res.render('login.html', {datos});
        datos= [true]; 
    }
});
ruta.get('/navegacion', db.getMenu); //Navegacion

ruta.get('/navegacion/users', db.getUser); //Usuarios

ruta.get('/navegacion/newPass/:id', function (req, res) {  // Cambiar  contraseña
    if (req.session.username) {
        const username = req.params.id;
        res.render('newPass.html', { username });
    } else {
        res.redirect('/');
    }


});

ruta.get('/navegacion/signIn', function (req, res) { //Registrar nuevo usuario
    if (req.session.username) {

        res.send('aqui va el html para poder registrar')
    } else {
        res.redirect('/');
    }
});

ruta.get('/navegacion/logout', (req, res) => { //Cerrar sesion 

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            datos=[]; 
            res.redirect('/');
        }
    });

});

///-----------------------PETICIONES

ruta.post('/', db.postLogin);
ruta.post('/navegacion/signIn', db.postRegisUser);
ruta.post('/navegacion/newPass/:id', db.postActualizarPass);


module.exports = ruta; 