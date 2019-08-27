'use strict'

var express= require('express');

var ClienteController = require('../controllers/cliente');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ClienteController.home);
router.post('/test', ClienteController.test);
router.post('/guardar-cliente', ClienteController.guardarCliente);
router.get('/cliente/:id?', ClienteController.getCliente);
router.get('/clientes', ClienteController.getClientes);
router.put('/cliente/:id?', ClienteController.updateCliente);
router.delete('/cliente/:id?', ClienteController.deleteCliente);
router.post('/upload-image/:id', multipartMiddleware, ClienteController.uploadImage);
router.get('/get-image/:image', ClienteController.getImageFile);


module.exports = router;