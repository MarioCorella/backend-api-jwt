const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://macosan:Telefona123@cluster0.hngyb.mongodb.net/todoList-MEAN');
        console.log('DB online');
    } catch(err) {
        console.log('err', err)
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}