var estrategia = require('passport-local').Strategy;
const db = require('pg').Pool;
var bcrypt = require('bcrypt');

var pool = new db({ //Configuracion base de datos
    user: 'postgres',
    host: 'localhost',
    database: 'inventario',
    password: '1',
    port: 5432,
})

//MODULOS
module.exports = function (paspport) {

    paspport.serializeUser(function (user, done) {
        done(null, user);
    });

    paspport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    paspport.use(new estrategia({
        passReqToCallback: true
    }, function (req, username, password, done) {

        pool.query('SELECT * FROM login WHERE id_usuario = $1', [username], function (err, resultado, fields) {
            if (err) throw err;

            if (resultado.rows.length > 0) {

                const datos = resultado.rows[0];
                if (bcrypt.compareSync(password, datos.contrasenia)) {

                    return done(null, user);

                } else {
                    return done(null, false);
                }
                
            } else {
                return done(null, false);
            }

        });

    }
    ));

};