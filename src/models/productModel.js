// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model do produto:
const productSchema = new Schema({
    name: {type: String, required: true, unique: true, lowercase: true},
    price: {type: Number, required: true},
    qtd: {type: String},
    category: {type: String, required: true, lowercase:true},
});

// Exportando o model
module.exports = mongoose.model('Product', productSchema);