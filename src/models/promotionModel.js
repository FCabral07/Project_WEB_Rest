const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promocaoSchema = new Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  produtosComDesconto: [String], // Lista de nomes de produtos com desconto para o cliente
});

module.exports = mongoose.model("Promocao", promocaoSchema);