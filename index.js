const express = require('express')
const app = express()
require('dotenv').config({path: 'variables.env'})
const conectarDB = require('./config/db')
const cors = require('cors')

const PORT = process.env.PORT || 4000

conectarDB()
// habilitar cors
app.use(cors())

app.use(express.json({extended: true}))

// routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/turnos', require('./routes/turnos'))

// Define la pagina principal
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

// Arrancar la app
app.listen(PORT, () => {
    console.log('Server on Port', PORT)
})