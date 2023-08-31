// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model do mercado:
const marketSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    employees: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

// Exportando o model
module.exports = mongoose.model('Market', marketSchema);