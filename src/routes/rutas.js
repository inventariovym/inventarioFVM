const express = require('express');
const ruta = express.Router();
const db = require('../database');
var datos = []; 

//RUTAS

ruta.get('/', (req, res) => {  //Inicio sesion
    if (req.session.username) {

        datos=[];
        res.redirect('/navegacion');
    } else {
        
        res.render('login.html', {datos});
        datos= [true]; 
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

//PRIMARIOS

ruta.get('/navegacion', db.getMenu); //Navegacion
ruta.get('/navegacion/producto', db.getProducto); //Productos
ruta.get('/navegacion/compra', db.getCompra); //Compras
ruta.get('/navegacion/salidaProducto', db.getSalidaProduc); //Salida Productos
ruta.get('/navegacion/reportes', db.getReporte); //Reportes
ruta.get('/navegacion/users', db.getUser); //Administrar Accesos

//SECUNDARIOS
ruta.get('/navegacion/users/signIn', db.getNewUser);

ruta.get('/navegacion/users/newPass/:id', function (req, res) {  // Cambiar  contraseña
    if (req.session.username) {
        var username = req.params.id;
        res.render('newPass.html', { username });
    } else {
        res.redirect('/');
    }
});

ruta.get('/navegacion/producto/newProduct', db.getNuevoProducto); //Crear producto

//PETICIONES

ruta.post('/', db.postLogin);
ruta.post('/navegacion/users/signIn', db.postRegisUser);
ruta.post('/navegacion/users/newPass/:id', db.postActualizarPass);
ruta.post('/navegacion/users/delUser/:id', db.postDelUser);
ruta.post('/navegacion/producto', db.postBusquedaProd); 
ruta.post('/navegacion/producto/newProduct', db.postNuevoProducto); //Crear producto
module.exports = ruta; 