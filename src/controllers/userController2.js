// Importando o model
const userModel = require("../models/userModel");

module.exports = {
  createUser: async (req, res) => {
    try {
      const result = await userModel.create(req.body);
      res.status(201).json({ message: `O usuário foi criado com sucesso!` });
    } catch (err) {
      res.status(500).json({ message: `Não foi possível criar o usuário` });
    }
  },

  getUser: async (req, res) => {
    try {
      const result = await userModel.findOne({ cpf: req.params.id });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Não foi possível recuperar o usuário no momento" });
    }
  },

  getUsers: async (req, res) => {
    try {
      const result = await userModel.find({}).select(["-_v", "-_id"]);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Não foi possível recuperar os usuários" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const result = await userModel.updateOne({ cpf: req.body.cpf }, req.body);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Usuário atualizado com sucesso." });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Não foi possível atualizar a lista dos dados" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await userModel.deleteOne({ cpf: req.params.id });
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Usuário removido com sucesso!" });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (err) {
      res.status(500).json({ message: "Não foi possível remover o usuário!" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await userModel.findOne({
        username: username,
        password: password,
      });

      if (user) {
        // Se o usuário for encontrado, responda com status 200 e uma mensagem de sucesso
        res.status(200).json({ message: "Login bem-sucedido." });
      } else {
        // Se o usuário não for encontrado, responda com status 401 para indicar credenciais inválidas
        res.status(401).json({ message: "Credenciais inválidas." });
      }
    } catch (err) {
      // Em caso de erro no servidor, responda com status 500
      res.status(500).json({ message: "Erro ao autenticar." });
    }
  },
};
