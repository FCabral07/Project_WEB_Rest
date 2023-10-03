const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../authMiddleware");
const roleMiddleware = require("../roleMiddleware");

//Autenticação na rota que cria um produto, altera e exclui um produto
router.use("/produto", authMiddleware, roleMiddleware);

//Autenticação das demais rotas (GET)
router.use("/produtos", authMiddleware, roleMiddleware);
//Autenticação na rota que exclui um produto

// Rota para criar um novo produto
router.post("/produto", productController.createProduct);

// Rota para listar todos os produtos
router.get("/produtos", productController.getProducts);

// Rota para listar todos os produtos em promoção
router.get("/produtos/promocoes", productController.getProductsPromotion);

// Rota para atualizar um produto
router.put("/produto", productController.updateProduct);

// Rota para excluir um produto
router.delete("/produtos/:codigoProduto", productController.deleteProduct);

module.exports = router;
