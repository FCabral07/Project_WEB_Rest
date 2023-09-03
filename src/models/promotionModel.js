// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model da promoção:
const promotionSchema = new Schema({
    name: {type: String, required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true, lowercase: true}],
    discount: {type: Number, required: true, min: 1, max: 99},
    id: {type: Number, unique: true}
});


// Tornando o ID auto incrementável
promotionSchema.pre('save', async function (next) {
    // Verifica se já tem o id
    if (this.id) {
        next();
        return;
    }

    // Encontra o maior ID
    const maxPromotion = await this.constructor.findOne({}, {}, { sort: { id: -1 } });

    // Define o id como o maior + 1
    this.id = maxPromotion ? maxPromotion.id + 1 : 1;

    next();
});

// Exportando o model
module.exports = mongoose.model('Promotion', promotionSchema);