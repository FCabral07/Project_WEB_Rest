const Promocao = require("../models/promocaoModel");
const Produto = require("../models/productModel");

// Função para adicionar uma nova promoção
async function adicionarPromocao(req, res) {
  try {
    const { codigoProduto } = req.params;
    const { porcentagemPromocao } = req.body;

    // Verifique se o produto existe
    const produto = await Produto.findOne({ codigoProduto });

    if (!produto) {
      return res.status(400).json({ mensagem: "Produto não encontrado." });
    }

    // Verifica se o produto já está em promoção
    if (produto.emPromocao) {
      return res
        .status(400)
        .json({ mensagem: "O produto já está em promoção." });
    }

    // Verifica se a porcentagemPromocao está dentro do intervalo permitido (1 a 90)
    if (porcentagemPromocao < 1 || porcentagemPromocao > 90) {
      return res.status(400).json({
        mensagem: "A porcentagem de promoção deve estar entre 1 e 90.",
      });
    }

    // Atualiza o produto para indicar que está em promoção
    produto.emPromocao = true;
    produto.valorPromocao = (1 - porcentagemPromocao / 100) * produto.valor;
    produto.porcentagemPromocao = porcentagemPromocao;
    await produto.save();

    res.status(201).json({ mensagem: "Promoção criada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao criar a promoção." });
  }
}

// Função para listar todos os produtos em promoção
async function listarProdutosEmPromocao(req, res) {
  try {
    // Realize uma consulta no banco de dados para encontrar todos os produtos com emPromocao: true
    const produtosEmPromocao = await Produto.find({ emPromocao: true });

    res.status(200).json(produtosEmPromocao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao listar produtos em promoção." });
  }
}

async function removerPromocao(req, res) {
  try {
    const { codigoProduto } = req.params; // Extrai o codigoProduto da URL

    // Verifique se o produto existe
    const produto = await Produto.findOne({ codigoProduto });

    if (!produto) {
      return res.status(400).json({ mensagem: "Produto não encontrado." });
    }

    // Verifique se o produto está em promoção
    if (!produto.emPromocao) {
      return res
        .status(400)
        .json({ mensagem: "O produto não está em promoção." });
    }

    // Remove a promoção do produto
    await Promocao.deleteOne({ produto: produto._id });

    // Atualize o produto para indicar que não está mais em promoção
    produto.emPromocao = false;
    produto.valorPromocao = 0;
    produto.porcentagemPromocao = 0;
    await produto.save();

    res.status(200).json({ mensagem: "Promoção removida com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover a promoção." });
  }
}

async function atualizarPromocao(req, res) {
  try {
    const { codigoProduto } = req.params; // Extrai o codigoProduto da URL
    const { porcentagemPromocao } = req.body;

    // Verifique se o produto existe
    const produto = await Produto.findOne({ codigoProduto });

    if (!produto) {
      return res.status(400).json({ mensagem: "Produto não encontrado." });
    }

    // Verifique se o produto está em promoção
    if (!produto.emPromocao) {
      return res
        .status(400)
        .json({ mensagem: "O produto não está em promoção." });
    }

    // Verifique se a porcentagemPromocao está dentro do intervalo permitido (1 a 90)
    if (porcentagemPromocao < 1 || porcentagemPromocao > 90) {
      return res.status(400).json({
        mensagem: "A porcentagem de promoção deve estar entre 1 e 90.",
      });
    }

    // Atualize a porcentagem da promoção
    produto.porcentagemPromocao = porcentagemPromocao;

    // Recalcule o valor da promoção com base na nova porcentagem
    produto.valorPromocao = (1 - porcentagemPromocao / 100) * produto.valor;
    await produto.save();

    res.status(200).json({ mensagem: "Promoção atualizada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao atualizar a promoção." });
  }
}

module.exports = {
  adicionarPromocao,
  listarProdutosEmPromocao,
  removerPromocao,
  atualizarPromocao,
};
