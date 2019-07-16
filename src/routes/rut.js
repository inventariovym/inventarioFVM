const express = require('express');
const ruta = express.Router();
const db = require('pg').Pool

const pool = new db({
  user: 'postgres',
  host: 'localhost',
  database: 'inventario',
  password: '1',
  port: 5432,
})


ruta.get('/', (req, res) => {
    res.render('index.html', { title: 'Inventario'});
});


ruta.post('/', (req, res) => {
    const { user, password } = req.body;
    console.log(`Usuario: ${user}  Password: ${password} `);

    pool.query('Insert INTO login VALUES ($1, $2)', [ user , password], (error, results) => {
     
        if (error) {
            throw erro
        } else {
            res.render('index.html', { title: 'Inventario' }); 
        }
    })
});

module.exports = ruta; 