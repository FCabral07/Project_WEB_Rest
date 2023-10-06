// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Model do produto:
const productSchema = new Schema({
    name: {type: String, required: true, unique: true, lowercase: true},
    src: {type: String, required: true},
    code: {type: String, required: true, lowercase: true, unique: true},
    price: {type: Number, required: true},
    isPromotion: {type: Boolean, default: false},
    promotionPrice: {type: Number, default: null},
    promotionPercentage: {type: Number, default:0},
    qtd: {type: String},
    category: [{type: String, lowercase:true}],   // É o tipo do produto
    expDate: {type: Date, required: true},
    description: {type: String},
});

// Criando a tag auto incrementável

// Exportando o model
module.exports = mongoose.model('Product', productSchema);