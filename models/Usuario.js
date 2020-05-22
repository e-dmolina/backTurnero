const mongoose = require('mongoose')

const UsuariosSchema = mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    rol: {type: String, trim: true, default: 'regular'},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    telefono: {type: String, required: true, trim: true},
    registro: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Usuario', UsuariosSchema)