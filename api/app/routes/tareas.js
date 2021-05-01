const express = require('express');
const TareaCtrl = require('../controllers/TareasController');

const Router = express.Router();

Router.get('/',TareaCtrl.index) // api.com/tarea/ Index: Listar todos los tarea
      .post('/',TareaCtrl.create)   // api.com/tarea/ Create: Crear un nuevo tarea
      .get('/:key/:value',TareaCtrl.find,TareaCtrl.show)    // api.com/tarea/category/Hogar Show: Muestra un tareao  específico
      .put('/:key',TareaCtrl.find,TareaCtrl.update)    // api.com/tarea/name/SamsungGalaxy Update: Actualizar un tarea en especifico
      .delete('/:key',TareaCtrl.find,TareaCtrl.remove);// api.com/tarea/name/SamsungGalaxy
module.exports = Router;