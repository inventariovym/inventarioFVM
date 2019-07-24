const db = require('pg').Pool;
const encrip = require('bcrypt');

const valor = { //DATOS PARA LA CONFIGURACION DE LA BASE DE DATOS
  user: 'postgres',
  host: 'localhost',
  database: 'inventario',
  password: '1',
  port: 5432
}

const pool = new db({ 
  user: valor.user,
  host: valor.host,
  database: valor.database,
  password: valor.password,
  port: valor.port
})

module.exports = {
  valor,  
  
  postSignIn: async function (req, res, next) { //Regristrar usuarios

    const { username, password } = req.body;
    console.log('Usuario: ${username}  Password: ${password} ');

    const salt = encrip.genSaltSync(10);
    const contrasenia = encrip.hashSync(req.body.password, salt);

    await pool.query('INSERT INTO login VALUES ($1, $2)', [req.body.username, contrasenia], (error, results) => {

      if (error) {
        throw error
      } else {
        res.render('login.html', { title: 'Inventario' });
      }

    })
  }

};