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
    authController.autenticarUsuario)

module.exports = router