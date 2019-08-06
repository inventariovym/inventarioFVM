const db = require('pg').Pool;
const encrip = require('bcrypt-nodejs');

const pool = new db({
  user: 'postgres',
  host: 'localhost',
  database: 'inventario',
  password: '1',
  port: 5432
})


module.exports = {

  postLogin: async function (req, res) { //INICIO DE SESION

    await pool.query('SELECT * FROM login WHERE id_usuario = $1', [req.body.username], (err, resultado) => {
      if (err) throw err;

      if (resultado.rows.length > 0) {
        const datos = resultado.rows[0];
        if (encrip.compareSync(req.body.password, datos.contrasenia)) {

          req.session.username = req.body.username;
          req.session.password = req.body.password;
          res.redirect('/navegacion');
          
        } else {
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }

    });
  },

  getMenu: async function(req, res){ //NAVEGACION
    if (req.session.username) {

      res.render('inicio.html');

    } else {
      res.redirect('/');
    }
  }, 

  getUser: async function (req, res) { //LISTA DE USUARIOS EN BD
    if (req.session.username) {

      await pool.query('SELECT * FROM login', function (err, resultado, fields) {
        const datos = resultado.rows;
        res.render('inicio.html', { datos });
      });

    } else {
      res.redirect('/');
    }

  },

  postActualizarPass: async function (req, res) { //ACTUALIZAR CONTRASEÑA

    if (req.session.username) {

      const username = req.params.id;
      const { password } = req.body;
      const salt = encrip.genSaltSync(10);
      const contrasenia = encrip.hashSync(password, salt);

      await pool.query('UPDATE login set contrasenia=$2 where id_usuario=$1', [username, contrasenia], (error, results) => {
        
        if (error) {
          throw error;
        } else {
          res.redirect('/navegacion');
        }
      })

    } else {
      res.redirect('/');
    }
  },

  postRegisUser: async function (req, res) { //Registrar usuarios

    if (req.session.username) {
      
      const { username, password } = req.body;
      const salt = encrip.genSaltSync(10);
      const contrasenia = encrip.hashSync(req.body.password, salt);

      await pool.query('INSERT INTO login VALUES ($1, $2)', [req.body.username, contrasenia], (error, results) => {

        if (error) {
          throw error
        } else {
          res.render('login.html', { title: 'Inventario' });
        }

      })
    } else {
      res.redirect('/');
    }
  }
};