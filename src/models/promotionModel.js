const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promocaoSchema = new Schema({
  produto: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  percentagePromotion:{
    type: Number,
    required: true,
    min:1,
    max: 90,
  },

  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  produtosComDesconto: [String], // Lista de nomes de produtos com desconto para o cliente
});

module.exports = mongoose.model("Promocao", promocaoSchema);