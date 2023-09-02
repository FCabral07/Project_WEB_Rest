// Importando o model
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config({path: 'config.env'})

//  Criando a exportação
module.exports = {
    
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
            const result = await userModel.findOne({cpf: req.body.cpf})
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
            const result = await userModel.deleteOne({cpf: req.body.cpf})
            res.status(200).send({message: "Usuário removido com sucesso!"})
        }catch(err){
            res.status(500).json({message: "Não foi possível remover o usuário!"})
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await userModel.findOne({ username: username }).select('+password');   

            // Autenticando o token e verificando o usuário
            if (user) {
                // Recebendo a senha digitada no body e comparando com a senha criptografada
                // presente na DB
                const passwordMatch = await bcrypt.compare(password, user.password);

                // Verificando a função e o token após a verificação da senha
                if(passwordMatch){
                    // Procurando a função do usuário
                    const role = user.role === 'funcionario' ? 'funcionario' : 'usuario'
                    // Gerando o token
                    const token = jwt.sign({username: user.username, role: role}, process.env.SECRET_KEY, { expiresIn: '1h'} );

                    // Retornando o token
                    res.status(200).json({ message: "Autenticação realizada.", token: token });
                }else{
                    // Senha não confere
                    res.status(401).json({ message: "Senha inválida"})
                }
            } else {
                // Usuário não encontrado
                res.status(401).json({ message: "Usuário inválido." });
            }
        } catch (err) {
            res.status(500).json({ message: "Erro ao autenticar." });
        }
    }

}