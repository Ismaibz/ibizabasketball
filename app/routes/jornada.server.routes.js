'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var jornada = require('../../app/controllers/jornada.api.server.controller');
  
    app.route('/api/jornada/nuevo')
        .post(jornada.nuevo);

    app.route('/api/jornada/leer/:id')
        .get(jornada.leer);

    app.route('/api/jornada/borrar/:id')
        .delete(jornada.borrar);

    app.route('/api/jornada/modificar/:id')
        .put(jornada.modificar);

    app.route('/api/jornada/listado/')
        .put(jornada.listado);
};