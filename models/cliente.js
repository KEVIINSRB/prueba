'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
	identificacion: Number,
	tipoIdentificacion: String,
	primerNombre: String,
	segundoNombre: String,
	primerApellido: String, 
	segundoApellido: String,
	direccion: String,
	telefono: Number,
	Email: String,
	ocupacion: String,
	fechaNacimiento: String,
	image: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);