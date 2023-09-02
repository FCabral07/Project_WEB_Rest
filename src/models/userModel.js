// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model do usuário/funcionário:
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String},
    cpf: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    salary: {type: Number},
    // Defino se é usuário ou funcionário
    role: {type: String}
    // Espaço para criar um histórico de compras
});

// Exportando o model
module.exports = mongoose.model('User', userSchema);