// Importando o model
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path: 'config.env'})

//  Criando a exportação
module.exports = {
    // Criação dos tokens
    createUser: async (req, res) => {
        try{
            const result = await userModel.create(req.body)

            res.status(201).json({message: `O usuário foi criado com sucesso!`})
        }catch (err){
            res.status(501).json({message: `Não foi possível criar o usuário`})
        }
    },

    getUser: async (req, res) => {
        try{
            const result = await userModel.findOne({cpf: req.params.id})
            res.status(200).send(result)
        }catch(err){
            res.status(503).json({message: "Não foi possível recuperar o usuário no momento"})
        }
    },

    getUsers: async (req, res) => {
        userModel.find({}).select(["-_v", "-_id"]).then((result)=> {
            res.status(200).json(result)
        }).catch(() => {
            res.status(503).json({message: "Não foi possível recuperar os usuários"})
        })
    },

    updateUser: async (req, res) => {
        try{
            const result = await userModel.updateOne({cpf: req.body.cpf}, req.body)
            res.status(200).send({message: "Usuário atualizado com sucesso."})
        }catch(err){
            res.status(501).json({message: "Não foi possível atualizar a lista dos dados"})
        }
    },

    deleteUser: async (req, res) => {
        try{
            const result = await userModel.deleteOne({cpf: req.params.id})
            res.status(200).send({message: "Usuário removido com sucesso!"})
        }catch(err){
            res.status(500).json({message: "Não foi possível remover o usuário!"})
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await userModel.findOne({ username: username, password: password });

            if (user) {
                const token = jwt.sign({username: user.username}, process.env.SECRET_KEY, { expiresIn: '1h'} )
                res.status(200).json({ message: "Autenticação realizada.", token: token });
            } else {
                res.status(401).json({ message: "Credenciais inválidas." });
            }
        } catch (err) {
            res.status(500).json({ message: "Erro ao autenticar." });
        }
    }

}