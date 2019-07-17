const db = require('pg').Pool;
const encrip = require('bcrypt');

const pool = new db({ //Configuracion base de datos
  user: 'postgres',
  host: 'localhost',
  database: 'inventario',
  password: '1',
  port: 5432,
})


module.exports = {

  postSignUp: function (req, res, next) {  //Validar inicio de sesion

    pool.query('SELECT * FROM login WHERE id_usuario = $1', [req.body.username], function (err, resultado, fields) {
      if (err) throw err;

      if (resultado.rows.length > 0) {

        const datos = resultado.rows[0];
        if (encrip.compareSync(req.body.password, datos.contrasenia)) {

          res.redirect('/navegacion');

        } else {
           res.redirect('/');
        }

      } else {
          res.redirect('/');
      }

    });

  },

  postSignIn: function (req, res, next) { //Regristrar usuarios

    const { username, password } = req.body;
    console.log(`Usuario: ${username}  Password: ${password} `);

    const salt = encrip.genSaltSync(10);
    const contrasenia = encrip.hashSync(req.body.password, salt);

    pool.query('INSERT INTO login VALUES ($1, $2)', [req.body.username, contrasenia], (error, results) => {

      if (error) {
        throw error
      } else {
        res.render('login.html', { title: 'Inventario' });
      }

    })
  }

};