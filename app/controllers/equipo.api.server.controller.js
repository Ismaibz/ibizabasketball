'use strict';

/**
 * Module dependencies.
 */

 var _ = require('lodash'),
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    Jugador = mongoose.model('Jugador'),
    Equipo = mongoose.model('Equipo'),
    Partido = mongoose.model('Partido'),
    utils = require('./utils.js');

var SERVER_PATH = '/var/www/html/ibizabasketball.tk/images/profiles/';
var SERVER_URL = 'http:/ibizabasketball.tk/images/profiles/';

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);    
}

exports.nuevo = function(req, res) {
	var equipo = new Equipo(req.body);	
	equipo.estadisticas.puntos = 0;
	equipo.victorias.puntos = 0;
	equipo.derrotas.puntos = 0;

	if (req.body.imagenPerfil){
            var nombreImagen = jugador._id + ".jpg";
            equipo.imagenPerfil = SERVER_URL + nombreImagen;
            base64_decode(req.body.imagenPerfil, SERVER_PATH + nombreImagen); 
    }	

    equipo.save(function(err) {
        if (err) {
            var ret = {};
        	ret.error = err.code;
        	ret.error_message = err;
            return res.status(200).jsonp(ret);	
        } else {                	
        	ret.error = 0;
            return res.status(200).jsonp(ret);	
        }
    });    
};

exports.leer = function(req, res) {   
	var query = Equipo.findById(req.params.id)
		.populate('jugadores.id', 'nombre apellidos puntos id imagenPerfil')
		.sort('jugadores.puntos');
	query.exec(function (err, equipo) {			
		return res.status(200).jsonp(equipo); 
	}); 
};

exports.borrar = function(req, res) {   
	var query = Equipo.findById(req.params.id);
	query.exec(function (err, equipo) {	
		equipo.remove();	
		var ret = {};				
		ret.error = 0;
		return res.status(200).jsonp(ret); 
	}); 
};

exports.modificarInfo = function(req, res) {   
	var query = Equipo.findById(req.params.id);
	query.exec(function (err, equipo) {

		if (req.body.imagenPerfil){
        	var nombreImagen = jugador._id + ".jpg";
        	equipo.imagenPerfil = SERVER_URL + nombreImagen;
        	base64_decode(req.body.imagenPerfil, SERVER_PATH + nombreImagen); 
		}

		if (req.body.nombre){
			equipo.nombre = req.body.nombre;
		}			

		if (req.body.puntos){
			equipo.estadisticas.puntos = req.body.puntos;
		}

		if (req.body.victorias){
			equipo.estadisticas.victorias = req.body.victorias;
		}

		if (req.body.derrotas){
			equipo.estadisticas.derrotas = req.body.victorias;
		}

		equipo.save(function(err) {
    		if (err) {
	            var ret = {};
	        	ret.error = err.code;
	        	ret.error_message = err;
	            return res.status(200).jsonp(ret);	
	        } else {  
	        	var ret = {};              	
	        	ret.error = 0;
	            return res.status(200).jsonp(ret);	
	        }
		});    			
	}); 
};

exports.modificarPuntos = function(req, res) {   
	var query = Equipo.findById(req.params.id);
	query.exec(function (err, equipo) {
		
		if (req.body.victoria){
			equipo.estadisticas.puntos += 3;
			equipo.estadisticas.victorias += 1;
		} else {
			equipo.estadisticas.derrotas += 1;
		}

		equipo.save(function(err) {
    		if (err) {
	            var ret = {};
	        	ret.error = err.code;
	        	ret.error_message = err;
	            return res.status(200).jsonp(ret);	
	        } else {  
	        	var ret = {};              	
	        	ret.error = 0;
	            return res.status(200).jsonp(ret);	
	        }
		});    			
	}); 
};

exports.listado = function(req, res) {   
	var query = Equipo.find();
	query.exec(function (err, equipos) {
		return res.status(200).jsonp(equipos);		
	}); 
};

exports.aniadirJugador = function(req, res) {   
	var query = Equipo.findById(req.params.id);
	query.exec(function (err, equipo) {
		
		if (req.body.jugador){
			var jugador = {};
			jugador._id = req.body.jugador;
			equipo.jugador.push(jugador);
		}

		equipo.save(function(err) {
    		if (err) {
	            var ret = {};
	        	ret.error = err.code;
	        	ret.error_message = err;
	            return res.status(200).jsonp(ret);	
	        } else {  
	        	var ret = {};              	
	        	ret.error = 0;
	            return res.status(200).jsonp(ret);	
	        }
		});    			
	}); 
};

exports.eliminarJugador = function(req, res) {   
	var query = Equipo.findById(req.params.id);
	query.exec(function (err, equipo) {
		
		if (req.body.jugador){
			equipo.jugadores.id(req.body.jugador).remove();
		}

		equipo.save(function(err) {
    		if (err) {
	            var ret = {};
	        	ret.error = err.code;
	        	ret.error_message = err;
	            return res.status(200).jsonp(ret);	
	        } else {  
	        	var ret = {};              	
	        	ret.error = 0;
	            return res.status(200).jsonp(ret);	
	        }
		});    			
	}); 
};

exports.proximos = function(req, res) {   
	var query = Partido.findById()
		.or([{'equipoLocal.id' : req.param.id},{'equipoVisitante.id' : req.param.id}])		
		.where('jugado').equals(0)
		.sort('-date');
	query.exec(function (err, partidos) {		
		if (req.body.jugador){
			equipo.jugadores.id(req.body.jugador).remove();
		}
        return res.status(200).jsonp(partidos);		    			
	}); 
};





