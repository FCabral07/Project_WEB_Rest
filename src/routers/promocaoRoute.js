const express = require("express");
const router = express.Router();
const promocaoController = require("../controllers/promocaoController");
const authMiddleware = require("../authMiddleware");
const roleMiddleware = require("../roleMiddleware");

//A rota GET de todas as promoções está em productRouter, logo, todas as demais rotas de promocaoRoute são autenticadas.
router.use("/produtos", authMiddleware, roleMiddleware);



// Rota para adicionar uma nova promoção a um produto
router.post(
  "/produtos/:codigoProduto/promocoes",
  promocaoController.adicionarPromocao
);

// Rota para excluir uma promoção
router.delete(
  "/produtos/:codigoProduto/promocoes",
  promocaoController.removerPromocao
);

// Rota para alterar a porcentagem de uma promoção
router.put(
  "/produtos/:codigoProduto/promocoes",
  promocaoController.atualizarPromocao
);

module.exports = router;
