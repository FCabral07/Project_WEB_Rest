// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model do usuário/funcionário:
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String},
    cpf: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salary: {type: Number},
    // Espaço para criar um histórico de compras
});

// Exportando o model
module.exports = mongoose.model('User', userSchema);