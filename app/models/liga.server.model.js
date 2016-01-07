'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LigaSchema = new Schema({     
    jornadas:{
    	type: Number,
    	default: 1
    }
});

mongoose.model('Liga', LigaSchema);