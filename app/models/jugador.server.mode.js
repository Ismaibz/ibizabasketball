'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JugadorSchema = new Schema({
    imagenPerfil:{
        type: String,
        default: 'http://www.wapmadrid.madridsalud.es/images/profiles/profile_default.png'
    },
    nombre: {
        type: String,
        trim: true,
        default: ''       
    },
    apellidos: {
        type: String,
        trim: true,
        default: ''
    },
    equipo: {
        type: Schema.ObjectId,
        ref: 'Equipo'
    },
    puntos: {
        type: Number        
    }
});

mongoose.model('Jugador', JugadorSchema);