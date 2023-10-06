// Importando o model
const productModel = require('../models/productModel')

//  Criando a exportação
module.exports = {
    createProduct: async (req, res) => {
        try{
            const result = await productModel.create(req.body)

            res.status(201).json({message: `O produto foi cadastrado com sucesso!`})
        }catch (err){
            res.status(501).json({message: `Não foi possível cadastrar o produto`})
        }
    },

    getProduct: async (req, res) => {
        try{
            const result = await productModel.findOne({ code: req.params.id });
            res.status(200).send(result)
        }catch(err){
            res.status(503).json({message: "Não foi possível recuperar o produto no momento"})
        }
    },

    getProducts: async (req, res) => {
        productModel.find({}).select(["-_v", "-_id"]).then((result)=> {
            res.status(200).json(result)
        }).catch(() => {
            res.status(503).json({message: "Não foi possível recuperar os produtos"})
        })
    },

    updateProduct: async (req, res) => {
        try{
            const result = await productModel.updateOne({code: req.body.code}, req.body)
            res.status(200).send({message: "Usuário atualizado com sucesso."})
        }catch(err){
            res.status(501).json({message: "Não foi possível atualizar a lista dos dados"})
        }
    },

    deleteProduct: async (req, res) => {
        try{
            const result = await productModel.deleteOne({code: req.params.id})
            res.status(200).send({message: "Produto removido com sucesso!"})
        }catch(err){
            res.status(500).json({message: "Não foi possível remover o produto!"})
        }
    },

}