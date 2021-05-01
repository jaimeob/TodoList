const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const App = express();


const Tarea = require('./routes/tareas')

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));


App.use(cors())

App.use('/tarea',Tarea);

module.exports  = App;

