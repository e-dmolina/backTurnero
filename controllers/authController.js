const UsuarioModel = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    // Revisamos si hay errores en la request
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    const { email, password } = req.body

    try {
        // Revisar que sea un usuario registrado
        let usuario = await UsuarioModel.findOne({ email: email })
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        // Revisar que el password sea correcto
        const passCorrecto = await bcrypt.compare(password, usuario.password)
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password incorrecto' })
        }

        // Crear y firmar jwt
        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error

            res.json({ token })
        })
    } catch (error) {
        console.log(error)
        res.json({msg: error})
    }
}

// obtiene que usuario está autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findById(req.usuario.id).select('-password')
        res.json(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
}