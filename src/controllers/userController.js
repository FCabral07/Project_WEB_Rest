// Importando o model
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // Número de rounds do meu HASH

dotenv.config({ path: 'config.env' });

// Criando a exportação
module.exports = {
    createUser: async (req, res) => {
        try {
            // Verifico se 'matricula' está presente no body
            const isEmployee = 'matricula' in req.body;
    
            // Uso o model de acordo com a verificação acima
            const userModelType = isEmployee ? userModel.Employee : userModel.User;
            
            // Crio um novo usuario
            const newUser = new userModelType(req.body);
    
            // Criptografo a senha
            const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
            newUser.password = hashedPassword;
    
            await newUser.save();
            
            res.status(201).json({ message: 'Usuário criado com sucesso.' });
        } catch (err) {
            if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                // Tratar o erro de e-mail duplicado aqui (caso seja relevante)
                res.status(400).json({ message: 'Este e-mail já está em uso.' });
            } else if (err.code === 11000 && err.keyPattern && err.keyPattern.cpf) {
                // Tratar o erro de CPF duplicado aqui (caso seja relevante)
                res.status(400).json({ message: 'Este CPF já está em uso.' });
            } else {
                res.status(500).json({ message: 'Erro ao criar o usuário.' });
            }
        }
    },    

    getUser: async (req, res) => {
        try {
            // Retorno o usuário especifico excluindo alguns parametros como o id e quantas vezes foi modificado
            const result = await userModel.findOne({ cpf: req.body.cpf }).select(["-_v", "-_id", "-__v"]);
            res.status(200).send(result);
        } catch (err) {
            res.status(503).json({ message: 'Não foi possível recuperar o usuário no momento' });
        }
    },

    getUsers: async (req, res) => {
        try {
            // Retorno os usuários excluindo alguns parametros como o id e quantas vezes foi modificado
            const users = await userModel.User.find({}).select(["-_v", "-_id", "-__v"]);
            res.status(200).json(users);
        } catch (error) {
            res.status(503).json({ message: "Não foi possível recuperar os usuários." });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { cpf, password } = req.body;
            const isEmployee = 'salary' in req.body; // Verifica se o campo 'salary' está presente
    
            // Define o valor da constante abaixo baseado se há o arg salário no body
            const userModelType = isEmployee ? userModel.Employee : userModel.User;
    
            // Encontra o usuário procurando o CPF e se é func ou user
            const user = await userModelType.findOne({ cpf: cpf });
    
            // Se não houver retorno de usuário
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
    
            // Atualiza os campos de acordo com a solicitação
            const update = req.body;
            for (const key in update) {
                if (Object.hasOwnProperty.call(update, key)) {
                    user[key] = update[key];
                }
            }
    
            // Se o parametro para atualizar for a senha, entra no if abaixo
            if (password) {
                // Criptografa novamente antes de salvar no BD
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                user.password = hashedPassword;
            }
    
            // Salva no BD
            await user.save();
    
            res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível atualizar o usuário.' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            // Recebendo o CPF do body
            const { cpf } = req.body;
    
            // Verificando se o CPF realmente foi fornecido
            if (!cpf) {
                return res.status(404).json({ message: 'Forneça o CPF do usuário a ser deletado.' });
            }
    
            // Buscando o usuário no BD e removendo ele
            const user = await userModel.User.findOneAndDelete({ cpf: cpf });
    
            // Caso não encontre o usuário entra no if abaixo
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
    
            // Retorno de user removido
            res.status(200).send({ message: 'Usuário removido com sucesso!' });
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível remover o usuário.' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Procura o usuário/funcionário através do email e seleciona o password
            const user = await userModel.User.findOne({ email: email }).select('+password');
            const employee = await userModel.Employee.findOne({ email: email }).select('+password');

            // Verifica se um user/func foi encontrado
            if (user || employee) {
                // Caso o usuário tenha sido encontrado, compara a senha fornecida com a senha no BD, ambas criptografadas
                const userFound = user || employee;
                const passwordCript = await bcrypt.compare(password, userFound.password);

                if (passwordCript) {
                    // Gera o token de acordo c o tipo de usuário, o __t indica a classe herdada, caso seja employee
                    const role = userFound.__t === 'Employee' ? 'funcionario' : 'usuario';
                    const token = jwt.sign({ username: userFound.username, role: role }, process.env.SECRET_KEY, { expiresIn: '1h' });
            
                    res.status(200).json({ message: 'Autenticação realizada.', token: token });
                } else {
                    res.status(401).json({ message: 'Senha inválida' });
                }
            } else {
                res.status(401).json({ message: 'Usuário ou funcionário inválido.' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro ao autenticar.' });
        }
    },
};