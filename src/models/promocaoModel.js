const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promocaoSchema = new mongoose.Schema({
  produto: {
    type: Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  porcentagemPromocao: {
    type: Number,
    required: true,
    min: 1, // Valor mínimo permitido
    max: 90, // Valor máximo permitido
  },
});

const Promocao = mongoose.model("Promocao", promocaoSchema);

module.exports = Promocao;
