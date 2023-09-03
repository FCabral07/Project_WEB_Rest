// Importe as bibliotecas necessárias
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crie o modelo de usuário
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  cpf: { type: String, unique: true }, // Remova a obrigação de ser requerido aqui
  password: { type: String, required: true },
  salary: { type: Number },
  role: { type: String },
});

// Middleware para antes de salvar o usuário
userSchema.pre("save", function (next) {
  // Obtenha o CPF do cabeçalho (header)
  const cpfFromHeader = this.get("cpf"); // Use o nome do header que você definir
  if (cpfFromHeader) {
    this.cpf = cpfFromHeader; // Defina o CPF no modelo de usuário
  }
  next();
});

// Exporte o modelo de usuário
module.exports = mongoose.model("User", userSchema);
