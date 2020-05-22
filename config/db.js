const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'})

const URL_DB = process.env.DB_MONGO || 'mongodb://localhost/turnero'

const conectarDB = async () => {
    try {
        await mongoose.connect(URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB is connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = conectarDB