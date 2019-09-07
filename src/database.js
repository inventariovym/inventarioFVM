var db = require('pg').Pool;
var encrip = require('bcrypt-nodejs');
var errorUser = [], exitoUser = [];

var pool = new db({
  user: 'postgres',
  host: 'localhost',
  database: 'inventario',
  password: '1',
  port: 5432
})


module.exports = {

  getMenu: function (req, res) { //NAVEGACION
    if (req.session.username) {

      res.render('menu.html');

    } else {
      res.redirect('/');
    }
  },

  getCompra: function (req, res) { //COMPRA
    if (req.session.username) {

      res.render('factura.html');

    } else {
      res.redirect('/');
    }
  },


  getProducto: async function (req, res) { //PRODUCTOS
    if (req.session.username) {
      await pool.query('SELECT * FROM producto', function (err, resultado, fields) {
        var producto = resultado.rows;
        res.render('productos.html', { producto });

      });
    } else {
      res.redirect('/');
    }
  },

  getSalidaProduc: function (req, res) { //SALIDA PRODUCTOS
    if (req.session.username) {

      res.render('salidaProductos.html');

    } else {
      res.redirect('/');
    }
  },

  getReporte: function (req, res) { //REPORTE
    if (req.session.username) {

      res.render('reportes.html');

    } else {
      res.redirect('/');
    }
  },

  getUser: async function (req, res) { //ADMINISTRAR ACCESOS
    if (req.session.username) {

      await pool.query('SELECT * FROM login', function (err, resultado, fields) {

        var datos = resultado.rows;
        res.render('users.html', { datos, errorUser, exitoUser });
        exitoUser = []; errorUser = [];
      });

    } else {

      res.redirect('/');
    }
  },

  getNewUser: function (req, res) { //Registrar Usuario

    if (req.session.username) {
      res.render('newUser.html');
    } else {
      res.redirect('/');
    }
  },

  postLogin: async function (req, res) { //INICIO DE SESION

    await pool.query('SELECT * FROM login WHERE id_usuario = $1', [req.body.username], (err, resultado) => {
      if (err) throw err;

      if (resultado.rows.length > 0) {
        var datos = resultado.rows[0];

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


  postActualizarPass: async function (req, res) { //ACTUALIZAR CONTRASEÑA
    exitoUser = []; errorUser = [];

    if (req.session.username) {

      var username = req.params.id;
      var { password, confirmar } = req.body;
      var salt = encrip.genSaltSync(10);
      var contrasenia = encrip.hashSync(password, salt);

      await pool.query('UPDATE login set contrasenia=$2 where id_usuario=$1', [username, contrasenia],
        (error, results) => {

          if (error) {

            errorUser.push(true);
            exitoUser = [];
            res.redirect('/navegacion/users');

          } else {

            exitoUser.push(true);
            errorUser = [];
            res.redirect('/navegacion/users');
          }

        })
    } else {
      res.redirect('/');
    }
  },

  postRegisUser: async function (req, res) { //Registrar usuarios
    exitoUser = []; errorUser = [];

    if (req.session.username) {

      var { username, password } = req.body;
      var salt = encrip.genSaltSync(10);
      var contrasenia = encrip.hashSync(req.body.password, salt);

      await pool.query('INSERT INTO login VALUES ($1, $2)', [username, contrasenia], (error, results) => {

        if (error) {

          errorUser.push(true);
          exitoUser = [];
          res.redirect('/navegacion/users');
        } else {

          exitoUser.push(true);
          errorUser = [];
          res.redirect('/navegacion/users');
        }
      })
    } else {

      res.redirect('/');
    }
  },

  postDelUser: async function (req, res) { //Eliminar usuario
    exitoUser = []; errorUser = [];

    if (req.session.username) {

      var username = req.params.id;

      await pool.query('DELETE FROM  login WHERE id_usuario = $1', [username], (error, results) => {

        if (error) {

          errorUser.push(true);
          exitoUser = [];
          res.redirect('/navegacion/users');
        } else {

          exitoUser.push(true);
          errorUser = [];
          res.redirect('/navegacion/users');
        }
      })
    } else {

      res.redirect('/');
    }
  }


};