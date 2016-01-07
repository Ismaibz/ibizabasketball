'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartidoSchema = new Schema({    
    hora: {
        type: String,
        trim: true,
        default: ''        
    },
    fecha: {
        type: Date
    },
    equipoLocal:{
        id: {
            type: Schema.ObjectId,
            ref: 'Equipo'
        },
        puntos: {
            type: Number,
            default: 0
        }
    },
    equipoVisitante:{
        id: {
            type: Schema.ObjectId,
            ref: 'Equipo'
        },
        puntos: {
            type: Number,
            default: 0
        }
    },
    estado:{
        type: String,
        enum: ['Sin Empezar', '1er Cuarto', '2o Cuarto', 'Descanso', '3er Cuarto', '4o Cuarto', 'Finalizado'],
        default: ['Sin Empezar']
    },
    jugado:{
        type: Number,
        default: 0
    }
});

mongoose.model('Partido', PartidoSchema);