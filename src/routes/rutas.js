const express = require('express');
const ruta = express.Router();
const passport = require('passport');

const db = require('../database');
const config = require('pg').Pool;

const pool = new config({ //Configuracion base de datos
    user: 'postgres',
    host: 'localhost',
    database: 'inventario',
    password: '1',
    port: 5432
})

///RUTAS
ruta.get('/', (req, res) => {  //Muestra el login.html
    res.render('login.html');
});

ruta.get('/navegacion', async (req, res) => { //PARA PRUEBA DE COMO LLENAR UNA TABLA CON DATOS
    await pool.query('SELECT * FROM login', function (err, resultado, fields) {
        const datos = resultado.rows;
        res.render('inicio.html', { datos });
    });
});

///PETICIONES
ruta.post('/', db.postSignUp); //INICIO DE SESION FUNCIONANDO



module.exports = ruta; 