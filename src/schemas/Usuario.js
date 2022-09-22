const mongoose = require('mongoose')
const { Schema } = mongoose;

const usuarioSchema = Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sexo: String,
    status: String
}) 

module.exports = mongoose.model('Usuario', usuarioSchema)