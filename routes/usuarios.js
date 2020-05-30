const { Router } = require('express');
const router = Router()
const { getUsuarios, getUsuario, createUsuario, deleteUsuario } = require('../controllers/usuarioController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')


// /api/usuarios
router.get('/', 
    auth,
    getUsuarios
)

router.post('/',
    [
        check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('telefono').not().isEmpty().withMessage('El telefono es obligatorio'),
        check('email').isEmail().withMessage('Agrega un email valido'),
        check('password').isLength({ min: 6 }).withMessage('El password debe ser minimo de 6 caracteres')
    ], createUsuario)

router.get('/:id',
    auth,
    getUsuario
)

router.delete('/:id',
    auth,
    deleteUsuario
)

module.exports = router