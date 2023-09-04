const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referência ao modelo de usuário
    required: true,
  },
  produtos: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Referência ao modelo de produto
        required: true,
      },
      quantidade: {
        type: Number,
        required: true,
      },
      tipo: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Pedido", pedidoSchema);