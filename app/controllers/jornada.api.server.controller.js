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
	var jornada = new Jornada(req.body);	
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
};

exports.leer = function(req, res) {   
	var query = Jornada.findById(req.params.id).populate('partidos.id');
	query.exec(function (err, jornada) {			
		return res.status(200).jsonp(jornada); 
	}); 
};

exports.borrar = function(req, res) {   
	var query = Jornada.findById(req.params.id);
	query.exec(function (err, jornada) {	
		jornada.remove();	
		var ret = {};				
		ret.error = 0;
		return res.status(200).jsonp(ret); 
	}); 
};

exports.modificar = function(req, res) {   
	var query = Jornada.findById(req.params.id);
	query.exec(function (err, jornada) {

		if (req.body.fecha){
			jornada.fecha = req.body.fecha;
		}			

		if (req.body.numero){
			jornada.jornada = req.body.jornada;
		}
		
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
};


exports.listado = function(req, res) {   
	var query = Jornada.find()
		.sort('-numero');
	query.exec(function (err, jornadas) {
		return res.status(200).jsonp(jornadas);		
	}); 
};