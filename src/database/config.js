const mongoose = require('mongoose');
const prue = require('dotenv').config()
const dbConnection = async () => {
    try {
        console.log('ENV', process.env.DB_CNN)
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB online');
    } catch(err) {
        console.log('err', err)
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}