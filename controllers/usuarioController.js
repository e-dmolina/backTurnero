const usuariosctl = {};
const UsuarioModel = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

usuariosctl.getUsuarios = async (req, res) => {
    try {
        const respuesta = await UsuarioModel.find();
        res.json(respuesta)
    } catch (error) {
        console.log(error)
        res.json({ message: error })
    }
};

usuariosctl.getUsuario = async (req, res) => {
    try {
        const respuesta = await UsuarioModel.findById(req.params.id);
        res.json(respuesta);
    } catch (error) {
        res.json({ message: error });
    }
}

usuariosctl.createUsuario = async (req, res) => {

    // Revisamos si hay errores en la request
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // Revisar que el usuario sea unico
        let existeUsuario = await UsuarioModel.findOne({email: req.body.email})
        if (existeUsuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' })
        }

        const newUsuario = new UsuarioModel(req.body);

        const hash = await bcrypt.hash(req.body.password, 12);
        newUsuario.password = hash;

        const usuarioCreado = await newUsuario.save();

        // Crear y firmar jwt
        const payload = {
            usuario: {
                id: usuarioCreado.id
            }
        }
        jwt.sign(payload, 'palabrasecreta', {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error

            res.json({ token })
        })

    } catch (error) {
        res.json({ message: error })
    }
}


// usuariosctl.updeteUsuario = async (req, res) => {
//     try {
//         const usuario = req.body;
//         const hash = await bcrypt.hash(req.body.password, 12);
//         usuario.password = hash;

//         const respuesta = await UsuarioModel.findByIdAndUpdate(req.params.id, usuario);
//         res.json(respuesta);
//     } catch (error) {
//         res.json({ message: error })
//     }
// }

usuariosctl.deleteUsuario = async (req, res) => {
    try {
        await UsuarioModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuario eliminado" })
    } catch (error) {
        res.json({ message: error })
    }
}

module.exports = usuariosctl;