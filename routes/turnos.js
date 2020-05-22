const { Router } = require('express');
const router = Router()
const { check } = require('express-validator')
const { createTurno, getTurnos, updateTurno, deleteTurno, getAllTurnos, getTurnosByDate } = require('../controllers/turnoController')
const auth = require('../middleware/auth')

// /api/turnos
// Obtener todos los turnos por id de usuario
router.get('/',
    auth,
    getTurnos
)

// Obtener todos los turnos
router.get('/all',
    auth,
    getAllTurnos
)

// Obtener todos los turnos
router.get('/fecha/:date',
    auth,
    getTurnosByDate
)

// Crear turno
router.post('/',
    auth,
    [
        check('fecha').not().isEmpty().withMessage('La fecha es obligatoria'),
        check('hora').not().isEmpty().withMessage('La hora es obligatoria')
    ],
    createTurno
)

// Actualizar turno por id
router.put('/:id',
    auth,
    [
        check('estado').not().isEmpty().withMessage('El estado es obligatorio'),
        check('fecha').not().isEmpty().withMessage('La fecha es obligatoria'),
        check('hora').not().isEmpty().withMessage('La hora es obligatoria')
    ],
    updateTurno
)

// Eliminar turno por id
router.delete('/:id',
    auth,
    deleteTurno
)

module.exports = router