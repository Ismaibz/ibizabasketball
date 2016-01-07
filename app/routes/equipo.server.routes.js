'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var equipo = require('../../app/controllers/equipo.api.server.controller');
  
    app.route('/api/equipo/nuevo')
        .post(equipo.nuevo);

    app.route('/api/equipo/leer/:id')
        .get(equipo.leer);

    app.route('/api/equipo/borrar/:id')
        .delete(equipo.borrar);

    app.route('/api/equipo/modificar/info/:id')
        .put(equipo.modificarInfo);

    app.route('/api/equipo/modificar/puntos/:id')
        .put(equipo.modificarPuntos);

    app.route('/api/equipo/listado')
        .get(equipo.listado);

    app.route('/api/equipo/jugador/aniadir/:id')
        .post(equipo.aniadirJugador);

    app.route('/api/equipo/jugador/eliminar/:id')
        .delete(equipo.eliminarJugador);

    app.route('/api/equipo/proximos/:id')
        .get(equipo.proximos);

};