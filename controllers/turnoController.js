const Turnosctl = {};
const TurnoModel = require('../models/Turno');
const UsuarioModel = require('../models/Usuario')
const { validationResult } = require('express-validator')
const moment = require('moment')

// Obtiene todos los turnos de todos los usuarios
Turnosctl.getAllTurnos = async (req, res) => {
    try {
        const turnos = await TurnoModel.find()
        console.log(new Date().getDate(), 'sdfs')

        return res.json(turnos)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

// obtiene los turnos del usuario logueado
Turnosctl.getTurnos = async (req, res) => {
    try {
        if (req.usuario.rol === 'Admin') {
            const turnos = await TurnoModel.find()
            let filtrados = await turnos.filter(t => t.fecha >= moment(new Date()).format('DD-MM-YYYY'))

            return res.json(filtrados)
        }
        const turnos = await TurnoModel.find({ cliente: req.usuario.id })
        let filtrados = await turnos.filter(t => t.fecha >= moment(new Date()).format('DD-MM-YYYY'))

        res.json(filtrados)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

// obtiene los turnos del usuario logueado
Turnosctl.getTurnosByDate = async (req, res) => {
    try {
        const turno = await TurnoModel.find({ fecha: req.params.date })
        res.json(turno)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

Turnosctl.createTurno = async (req, res) => {

    // Revisar si hay errores en la request
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        const nuevoTurno = new TurnoModel(req.body)

        // Guardar el cliente via jwt
        nuevoTurno.cliente = req.usuario.id
        // Guardar el turno
        const turnoCreado = await nuevoTurno.save()
        res.json(turnoCreado)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

Turnosctl.updateTurno = async (req, res) => {
    // Revisar si hay errores en la request
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // Revisar Id
        let turno = await TurnoModel.findById(req.params.id)
        // Si el turno no existe
        if (!turno) {
            return res.status(404).json({ msg: 'Turno no encontrado' })
        }
        // Si el turno existe
        // verificar el creador del proyecto
        if (turno.cliente.toString() !== req.usuario.id && req.usuario.rol !== 'Admin') {
            return res.status(401).json({ msg: 'Turno pertenece a otro usuario, No autorizado' })
        }

        // Actualizar
        turno = await TurnoModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })

        res.json(turno)

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

Turnosctl.deleteTurno = async (req, res) => {
    try {
        // Revisar Id
        let turno = await TurnoModel.findById(req.params.id)

        // Si el turno no existe
        if (!turno) {
            return res.status(404).json({ msg: 'Turno no encontrado' })
        }
        // Si el turno existe
        // verificar el creador del proyecto
        if (turno.cliente.toString() !== req.usuario.id && req.usuario.rol !== 'Admin') {
            return res.status(401).json({ msg: 'Turno pertenece a otro usuario, No autorizado' })
        }

        // Eliminar turno
        await TurnoModel.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Turno eliminado' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

module.exports = Turnosctl