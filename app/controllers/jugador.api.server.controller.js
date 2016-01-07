'use strict';

/**
 * Module dependencies.
 */

 var _ = require('lodash'),
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    Jugador = mongoose.model('Jugador'),
    utils = require('./utils.js');

var SERVER_PATH = '/var/www/html/ibizabasketball.tk/images/profiles/';
var SERVER_URL = 'http:/ibizabasketball.tk/images/profiles/';

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);    
}

exports.nuevo = function(req, res) {
	var jugador = new Jugador(req.body);	
	jugador.puntos = 0;

	if (req.body.imagenPerfil){
            var nombreImagen = jugador._id + ".jpg";
            jugador.imagenPerfil = SERVER_URL + nombreImagen;
            base64_decode(req.body.imagenPerfil, SERVER_PATH + nombreImagen); 
    }	

    jugador.save(function(err) {
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
	var query = Jugador.findById(req.params.id).populate('equipo', 'nombre _id imagenPerfil');
	query.exec(function (err, jugador) {			
		return res.status(200).jsonp(jugador); 
	}); 
};

exports.borrar = function(req, res) {   
	var query = Jugador.findById(req.params.id);
	query.exec(function (err, jugador) {	
		jugador.remove();	
		var ret = {};				
		ret.error = 0;
		return res.status(200).jsonp(ret); 
	}); 
};

exports.modificarInfo = function(req, res) {   
	var query = Jugador.findById(req.params.id);
	query.exec(function (err, jugador) {

		if (req.body.imagenPerfil){
        	var nombreImagen = jugador._id + ".jpg";
        	jugador.imagenPerfil = SERVER_URL + nombreImagen;
        	base64_decode(req.body.imagenPerfil, SERVER_PATH + nombreImagen); 
		}

		if (req.body.nombre){
			jugador.nombre = req.body.nombre;
		}	

		if (req.body.apellidos){
			jugador.apellidos = req.body.apellidos;
		}

		if (req.body.equipo){
			jugador.equipo = req.body.equipo;
		}

		if (req.body.puntos){
			jugador.puntos = req.body.puntos;
		}

		jugador.save(function(err) {
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
	var query = Jugador.findById(req.params.id);
	query.exec(function (err, jugador) {
		
		if (req.body.puntos){
			jugador.puntos += req.body.puntos;
		}

		jugador.save(function(err) {
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
	var query = Jugador.find().populate('equipo', 'nombre _id imagenPerfil').sort('puntos');
	query.exec(function (err, jugadores) {
		return res.status(200).jsonp(jugadores);		
	}); 
};


