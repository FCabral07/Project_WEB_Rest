// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model do usuário/funcionário:
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String},
    cpf: {type: String, required: true, unique: true},  // O identificador é o CPF
    // Com o select false eu digo ao meu código para não retornar esse valor em
    // consultas REST
    password: {type: String, required: true, select: false},
    age: {type: Number},
    // Espaço para criar um histórico de compras
});

// Modelo para usuário
const User = mongoose.model('User', userSchema);

// Modelo para funcionário
const Employee = User.discriminator('Employee', new Schema({
    salary: {type: Number, required: true},
}))

// Exportando o model
module.exports = { User, Employee };
