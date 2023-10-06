const Promocao = require("../models/promotionModel");
const Pedido = require("../models/pedidoModel");
const { User, Employee } = require("../models/userModel");
const Product = require("../models/productModel");

module.exports = {
  adicionarPromocao: async (req, res) => {
    try {
      const { code } = req.body;
      const { promotionPercentage } = req.body;

      const produto = await Product.findOne({ code })

      if(!produto){
        console.log(code)
        console.log(promotionPercentage)
        return res.status(410).json({ message: "Product not found"});
      }

      if (produto.isPromotion){
        return res.status(401).json({ message: "Promotion not implemented, already satisfied this"})
      }

      if (promotionPercentage < 1 || promotionPercentage > 90) {
        return res.status(400).json({
          mensagem: "A porcentagem de promoção deve estar entre 1 e 90.",
        });
      }

      produto.isPromotion = true;
      produto.promotionPrice = (1 - promotionPercentage / 100) * produto.price;
      produto.promotionPercentage = promotionPercentage;
      await produto.save();

      res.status(201).json({ mensagem: "Promoção criada com sucesso." });
    
    } catch (error) {
      console.error("Erro ao aplicar a promoção:", error);
      res.status(500).json({ message: "Erro ao aplicar a promoção." });
    }
  },

  listarProdutosEmPromocao: async (req, res) => {
    try {
      const produtosEmPromocao = await Product.find({ isPromotion: true });

      res.status(200).json(produtosEmPromocao)
    } catch (error) {
      console.error("Erro ao obter produtos com desconto:", error);
      res.status(500).json({ message: "Erro ao obter produtos com desconto." });
    }
  },

  removerPromocao: async(req, res) => {
    try {
      const { code } = req.body;
  
      // Verifique se o produto existe
      const produto = await Product.findOne({ code });
  
      if (!produto) {
        return res.status(400).json({ mensagem: "Produto não encontrado." });
      }
  
      // Verifique se o produto está em promoção
      if (!produto.isPromotion) {
        return res
          .status(400)
          .json({ mensagem: "O produto não está em promoção." });
      }
  
      // Remove a promoção do produto
      await Promocao.deleteOne({ produto: produto._id });
  
      // Atualize o produto para indicar que não está mais em promoção
      produto.isPromotion = false;
      produto.promotionPrice = 0;
      produto.promotionPercentage = 0;
      await produto.save();
  
      res.status(200).json({ mensagem: "Promoção removida com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao remover a promoção." });
    }
  },

  atualizarPromocao: async(req, res) => {
    try {
      const { code } = req.body; // Extrai o codigoProduto da URL
      const { promotionPercentage } = req.body;
  
      // Verifique se o produto existe
      const produto = await Product.findOne({ code });
  
      if (!produto) {
        return res.status(400).json({ mensagem: "Produto não encontrado." });
      }
  
      // Verifique se o produto está em promoção
      if (!produto.isPromotion) {
        return res
          .status(400)
          .json({ mensagem: "O produto não está em promoção." });
      }
  
      // Verifique se a porcentagemPromocao está dentro do intervalo permitido (1 a 90)
      if (promotionPercentage < 1 || promotionPercentage > 90) {
        return res.status(400).json({
          mensagem: "A porcentagem de promoção deve estar entre 1 e 90.",
        });
      }
  
      // Atualize a porcentagem da promoção
      produto.promotionPercentage = promotionPercentage;
  
      // Recalcule o valor da promoção com base na nova porcentagem
      produto.promotionPrice = (1 - promotionPercentage / 100) * produto.price;
      await produto.save();
  
      res.status(200).json({ mensagem: "Promoção atualizada com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao atualizar a promoção." });
    }
  }
  

};