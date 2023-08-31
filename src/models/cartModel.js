// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model do carrinho:
const cartSchema = new Schema({
    // User e products referenciam a outro schema, por isso o ref
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}],
    totalPrice: {type: Number, required: true},
});

// Exportando o model
module.exports = mongoose.model('Cart', cartSchema);