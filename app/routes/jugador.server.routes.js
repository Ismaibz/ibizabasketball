'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var jugador = require('../../app/controllers/jugador.api.server.controller');
  
    app.route('/api/jugador/nuevo')
        .post(jugador.nuevo);

    app.route('/api/jugador/leer/:id')
        .get(jugador.leer);

    app.route('/api/jugador/borrar/:id')
        .delete(jugador.borrar);

    app.route('/api/jugador/modificar/info/:id')
        .post(jugador.modificarInfo);

    app.route('/api/jugador/modificar/puntos/:id')
        .post(jugador.modificarPuntos);    

    app.route('/api/jugador/listado')
        .get(jugador.listado);

};