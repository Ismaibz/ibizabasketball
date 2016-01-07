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
    Jornada = mongoose.model('Jornada'),
    utils = require('./utils.js');

var SERVER_PATH = '/var/www/html/ibizabasketball.tk/images/profiles/';
var SERVER_URL = 'http:/ibizabasketball.tk/images/profiles/';

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);    
}

exports.nuevo = function(req, res) {
	var partido = new Partido(req.body);
	partido.equipoLocal.id = req.body.equipoLocal;
	partido.equipoVisitante.id = req.body.equipoVisitante;	
    partido.save(function(err) {
        if (err) {
            var ret = {};
        	ret.error = err.code;
        	ret.error_message = err;
            return res.status(200).jsonp(ret);	
        } else {   
        	var query = Jornada.findById(req.body.jornada);
        	query.exec(function (err, jornada) {	
        		var partidos = {};
        		partidos.id = partido._id;
        		jornada.partidos.push(partidos);
        		jornada.save(function(err) {
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
        }
    });    
};

exports.leer = function(req, res) {   
	var query = Partido.findById(req.params.id).populate('equipoLocal.id').populate('equipoVisitante.id');
	query.exec(function (err, partido) {			
		return res.status(200).jsonp(partido); 
	}); 
};

exports.borrar = function(req, res) {   
	var query = Partido.findById(req.params.id);
	query.exec(function (err, partido) {	
		partido.remove();	
		var ret = {};				
		ret.error = 0;
		return res.status(200).jsonp(ret); 
	}); 
};

exports.modificar = function(req, res) {   
	var query = Partido.findById(req.params.id);
	query.exec(function (err, partido) {

		if (req.body.fecha){
			partido.fecha = req.body.fecha;
		}			

		if (req.body.hora){
			partido.hora = req.body.hora;
		}

		if (req.body.jugado){
			partido.jugado = req.body.jugado;
		}

		if (req.body.estado){
			partido.estado = req.body.estado;
		}

		if (req.body.equipoLocal){
			partido.equipoLocal.id = req.body.equipoLocal;
		}

		if (req.body.puntosEquipoLocal){
			partido.equipoLocal.puntos = req.body.puntosEquipoLocal;
		}

		if (req.body.equipoVisitante){
			partido.equipoVisitante.id = req.body.equipoVisitante;
		}

		if (req.body.puntosEquipoVisitante){
			partido.equipoVisitante.puntos = req.body.puntosEquipoVisitante;
		}

		partido.save(function(err) {
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
	var query = Partido.find()
		.populate('equipoLocal.id', 'imagenPerfil nombre _id')
		.populate('equipoVisitante.id', 'imagenPerfil nombre _id');;
	query.exec(function (err, partidos) {
		return res.status(200).jsonp(partidos);		
	}); 
};

exports.cambiarEstado = function(req, res) {   
	var ret = {};              	
	ret.error = 0;
    return res.status(200).jsonp(ret);	
};

exports.marcador = function(req, res) {   
	var ret = {};              	
	ret.error = 0;
    return res.status(200).jsonp(ret);	
};





