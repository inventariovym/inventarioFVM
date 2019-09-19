var db = require('pg').Pool;
var encrip = require('bcrypt-nodejs');
var errorUser = [], exitoUser = [];

var pool = new db({
  user: 'postgres',
  host: 'localhost',
  database: 'inventario',
  password: '1234',
  port: 5432
})


module.exports = {

  getNuevoProducto: function (req, res) { //NUEVO PRODUCTO
    if (req.session.username) {

      res.render('newProduct.html');

    } else {
      res.redirect('/');
    }
  },

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
        res.render('productos.html', { producto, errorUser, exitoUser });

        exitoUser = []; errorUser = [];
      });
    } else {
      exitoUser = []; errorUser = [];
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
      exitoUser = []; errorUser = [];
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

  getNuevoProveedor: function (req, res) { //Registrar Proveedor

    if (req.session.username) {
      res.render('nuevoProveedor.html');
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
      exitoUser = []; errorUser = [];
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
      exitoUser = []; errorUser = [];
      res.redirect('/');
    }
  },

  postBusquedaProd: async function (req, res) {
    if (req.session.username) {

      var { producto } = req.body;
      var producto1 = '%' + producto.toUpperCase() + '%';
      var producto2 = '%' + producto.toLowerCase() + '%';

      await pool.query('SELECT * FROM producto WHERE  nombreprod LIKE $1 or  nombreprod LIKE $2', [producto1, producto2], (error, resultado) => {

        if (error) {
          res.redirect('/navegacion/producto');

        } else {
          var producto = resultado.rows;
          res.render('productos.html', { producto });

        }
      })

    } else {

      res.redirect('/');
    }
  },

  postNuevoProveedor: async function (req, res) {

    if (req.session.username) {

      var { nitproveedor, nombreproveedor } = req.body;
      console.log(nitproveedor);
      console.log(nombreproveedor);

      await pool.query('INSERT INTO proveedor values ($1, $2)', [nitproveedor, nombreproveedor], (error, resultado) => {

        if (error) {

          errorUser.push(true);
          exitoUser = [];
          res.redirect('/navegacion/compra');

        } else {

          exitoUser.push(true);
          errorUser = [];
          res.redirect('/navegacion/compra');
        }
      })

    } else {
      exitoUser = []; errorUser = [];
      res.redirect('/');
    }
  },

  postNuevoProducto: async function (req, res) {

    if (req.session.username) {

      var { nameProduct, medida, cantidad } = req.body;
      var producto= "'producto_id'"; 
      console.log(medida);
      console.log(nameProduct);
      console.log(cantidad);

      await pool.query('INSERT INTO producto values (nextval('+producto+'), $1, $2, $3)', [nameProduct, medida, cantidad], (error, resultado) => {

        if (error) {

          errorUser.push(true);
          exitoUser = [];
          res.redirect('/navegacion/producto');

        } else {

          exitoUser.push(true);
          errorUser = [];
          res.redirect('/navegacion/producto');
        }
      })

    } else {
      exitoUser = []; errorUser = [];
      res.redirect('/');
    }
  },


};