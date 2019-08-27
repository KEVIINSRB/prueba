'use strict'

var Cliente = require('../models/cliente');
var fs = require('fs');
var path = require('path');

var controller = {

	home:function(req, res){
		return res.status(200).send({
			message: 'home'
		});
	},

	test:function(req, res){
		return res.status(200).send({
			message: 'soy un metodo'
		});
	},

	guardarCliente: function(req, res){
		var cliente = new Cliente();

		var params = req.body;
		cliente.identificacion = params.identificacion;
		cliente.tipoIdentificacion = params.tipoIdentificacion
		cliente.primerNombre = params.primerNombre;
		cliente.segundoNombre = params.segundoNombre;
		cliente.primerApellido = params.primerApellido;
		cliente.segundoApellido = params.segundoApellido;
		cliente.direccion = params.direccion;
		cliente.telefono = params.telefono;
		cliente.Email = params.Email;
		cliente.ocupacion = params.ocupacion
		cliente.fechaNacimiento =params.fechaNacimiento;
		cliente.image = null;

		cliente.save((err, clienteStored) =>{
			if (err) return res.status(500).send({message  : 'Error en el documento.'});

			if(!clienteStored) res.status(404).send({message  : 'Error al guardarel cliente.'});

			return res.status(200).send({cliente  : clienteStored});
		});
	},

	getCliente: function(req, res){
		var clienteId = req.params.id;

		if( clienteId == null)return res.status(404).send({message  : 'EL cliente no existe.'});

		Cliente.findById(clienteId, (err, cliente) =>{
			if (err) return res.status(500).send({message  : 'Error al devolver datos.'});

			if(!cliente) res.status(404).send({message  : 'EL cliente no existe.'});

			return res.status(200).send({
				cliente
			});
		});
	},
	getClientes: function(req, res){
		Cliente.find({}).exec((err, clientes) =>{
			if (err) return res.status(500).send({message  : 'Error al devolver datos.'});

			if(!clientes) res.status(404).send({message  : 'no hay clientes para mostrar.'});

			return res.status(200).send({clientes});
		});
	},

	updateCliente: function(req, res){
		var clienteId = req.params.id;
		var update = req.body;

		Cliente.findByIdAndUpdate(clienteId, update,{new:true}, (err, clienteUpdate) =>{
			if (err) return res.status(500).send({message  : 'Error al actualizar.'});

			if(!clienteUpdate) res.status(404).send({message  : 'no hay clientes para actualizar.'});

			return res.status(200).send({cliente:clienteUpdate});
		});
	},

	deleteCliente: function(req, res){
		var clienteId = req.params.id;

		Cliente.findByIdAndRemove(clienteId,  (err, clienteRemoved) =>{
			if (err) return res.status(500).send({message  : 'Error al borrar.'});

			if(!clienteRemoved) res.status(404).send({message  : 'no hay clientes para borrar.'});

			return res.status(200).send({cliente:clienteRemoved}); 
		});
	},

	uploadImage: function(req, res){
		var clienteId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Cliente.findByIdAndUpdate(clienteId, {image: fileName}, {new: true}, (err, clienteUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!clienteUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						cliente: clienteUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

	},

	getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
};

module.exports = controller;