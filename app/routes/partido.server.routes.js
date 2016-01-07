'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var partido = require('../../app/controllers/partido.api.server.controller');
  
    app.route('/api/partido/nuevo')
        .post(partido.nuevo);

    app.route('/api/partido/leer/:id')
        .get(partido.leer);

    app.route('/api/partido/borrar/:id')
        .delete(partido.borrar);

    app.route('/api/partido/modificar/:id')
        .post(partido.modificar);

    app.route('/api/partido/listado')
        .get(partido.listado);

    app.route('/api/partido/estado/:id')
        .post(partido.cambiarEstado);

    app.route('/api/partido/marcador/:id')
        .post(partido.marcador);

};