const mongoose = require("mongoose");

const Produto = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  codigoProduto: {
    type: String,
    required: true,
    unique: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  emPromocao: {
    type: Boolean,
    default: false,
  },
  valorPromocao: {
    type: Number,
    default: 0,
  },
  porcentagemPromocao: {
    type: Number,
    default: 0,
  },
});

module.exports = Produto;
