// Realizando importações
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path: 'config.env'})

module.exports = (req, res, next) => {
    // Definindo o token
    const token = req.header('Authorization')

    // Se o sistema não encontrar o token
    if(!token){
        return res.status(401).json({message: 'Token Ausente.'})
    }

    // Sistema encontra o token e entra no try catch
    try{
        // Uso a função do jwt verify para verificar o token, uso o split para obter
        // apenas o conteúdo do token, tirando o 'Bearer' que vem na frente 
        // (o mais difícil foi descobrir que vinha essa palavra na frente)
        const verifyToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
        req.user = verifyToken
        next()
    }catch(err){
        // Trato o erro de token inválido para não confundir
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token Inválido.' });
        }
        // Generalizo os outros erros com o erro de verificar o token
        return res.status(500).json({ message: 'Erro ao verificar o token.' });
    }
}