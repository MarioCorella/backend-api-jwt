const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    const options = {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        autoIndex: true,
        family: 4
      }
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_CNN}`, options);
        console.log('DB online');
    } catch(err) {
        console.log('err', err)
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}