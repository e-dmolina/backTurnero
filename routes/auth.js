const { Router } = require('express');
const router = Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

// /api/auth
// Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

// Iniciar sesión
router.post('/',
    // [
    //     check('email').isEmail().withMessage('Agrega un email valido'),
    //     check('password').isLength({ min: 6 }).withMessage('El password debe ser minimo de 6 caracteres')
    // ], 
    authController.autenticarUsuario)

module.exports = router