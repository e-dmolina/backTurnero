const mongoose = require('mongoose')

const TurnosSchema = mongoose.Schema({
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    estado: {type: String, default: 'creado'},
    fecha: {type: String, required: true},
    hora: {type: String, required: true},
    creado: {type: Date, default: new Date( new Date().getTime() - ( new Date().getTimezoneOffset() * 60000 ) )}
})

module.exports = mongoose.model('Turno', TurnosSchema)