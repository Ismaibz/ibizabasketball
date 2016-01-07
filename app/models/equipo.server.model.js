'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EquipoSchema = new Schema({
    imagenPerfil:{
        type: String,
        default: 'http://www.wapmadrid.madridsalud.es/images/profiles/profile_default.png'
    },
    nombre: {
        type: String,
        trim: true,
        default: ''
    },   
    estadisticas: {
        victorias: {
            type: Number
        },
        derrotas: {
            type: Number
        },
        puntos: {
            type: Number
        }
    },
    jugadores:[{
        id: {
            type: Schema.ObjectId,
            ref: 'Jugador'
        }
    }]
});

mongoose.model('Equipo', EquipoSchema);