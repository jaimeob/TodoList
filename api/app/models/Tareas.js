const mongoose = require('mongoose');

const TareasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    estatus: {
        type: Boolean,
        default:true,
        
    }
});

const Tarea = mongoose.model('Tarea',TareasSchema);

module.exports = Tarea;

    // descripcion: {
    //     type: String,
    //     required: true
    // },
    // category: {
    //     type: String,
    //     required: true,
    //     enum: ['Niños','Hogar','Entretenimiento']
    // },
    // stock: {
    //     type: Number,
    //     default: 10
    // },