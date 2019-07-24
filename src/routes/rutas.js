const express = require('express');
const ruta = express.Router();
const encrip = require('bcrypt');

const db = require('../database');
const config = require('pg').Pool;
const val = db.valor;

//Configuracion base de datos 
const pool = new config({
    user: val.user,
    host: val.host,
    database: val.database,
    password: val.password,
    port: val.port
})

///---------------------------------------------RUTAS

//Vista login FUNCIONANDO
ruta.get('/', (req, res) => {  

    if (req.session.username) {
        res.redirect('/navegacion');
    } else {
        res.render('login.html');
    }

});

//Cerrar sesion FUNCIONANDO
ruta.get('/logout', (req,res) => { 
	
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});

});

ruta.get('/navegacion', async (req, res) => { //PARA PRUEBA DE COMO LLENAR UNA TABLA CON DATOS
    
    if (req.session.username) {

        await pool.query('SELECT * FROM login', function (err, resultado, fields) {
            const datos = resultado.rows;
            res.render('inicio.html', { datos });
        });

    } else {
        res.render('login.html');
    }

       
});

///--------------------------------------------------------------PETICIONES

//Validar inicio de sesion FUNCIONANDO
ruta.post('/', async (req, res, next) => {  

    await pool.query('SELECT * FROM login WHERE id_usuario = $1', [req.body.username], function (err, resultado, fields) {
        if (err) throw err;

        if (resultado.rows.length > 0) {

            const datos = resultado.rows[0];
            if (encrip.compareSync(req.body.password, datos.contrasenia)) {
                
                req.session.username =  req.body.username; 
                req.session.password =  req.body.password; 
                res.redirect('/navegacion');

            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }

    });
    
});

///Registrar usuarios FUNCIONANDO
ruta.post('/navegacion/signIn', db.postSignIn);

module.exports = ruta; 