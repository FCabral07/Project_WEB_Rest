// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model da promoção:
const promotionSchema = new Schema({
    name: {type: String, required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}],
    discount: {type: Number, required: true},
});

// Exportando o model
module.exports = mongoose.model('Promotion', promotionSchema);