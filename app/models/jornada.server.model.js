'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JornadaSchema = new Schema({      
    fecha: {
        type: Date
    },
    partidos:[{
        id: {
            type: Schema.ObjectId,
            ref: 'Partido'
        }
    }],
    numero: {
        type: Number
    }
});

mongoose.model('Jornada', JornadaSchema);