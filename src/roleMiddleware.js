// Realizando importações
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path: 'config.env'})

module.exports = (req, res, next) => {
    // Recebendo o token
    const token = req.header('Authorization')

    // Se o sistema não encontrar o token
    if(!token){
        return res.status(401).json({message: 'Token Ausente.'})
    }

    // Sistema encontra o token e entra no try catch
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        
        // Checando qual a categoria do acesso: USUARIO || FUNCIONARIO
        if (decoded.role !== 'funcionario') {
            return res.status(401).json({ message: 'Acesso Proibido.' });
        }

        // Copiando através do ... as informações
        req.user = { ...decoded, role: decoded.role };
    
        next();
    }catch(err){
        // Trato o erro de token inválido para não confundir
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token Inválido.' });
        }
        // Generalizo os outros erros com o erro de verificar o token
        return res.status(500).json({ message: 'Erro ao verificar o token.' });
    }
}