'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
	nombre: String,
	apellido: String, 
	direccion: String,
	telefono: Number,
	Email: String,
	fechaNacimiento: String,
	image: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);