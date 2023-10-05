// Realizando importações
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

module.exports = (req, res, next) => {
    // Recebendo o token no formato "Bearer ${token}"
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(410).json({ message: 'Token Ausente.' });
    }

    // Verifique se o cabeçalho começa com "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(402).json({ message: 'Token Inválido.' });
    }

    // Extrair o token
    const token = authHeader.substring(7);

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded.role !== 'funcionario') {
            return res.status(401).json({ message: 'Acesso Proibido. Somente funcionários permitidos.' });
        }

        req.user = { ...decoded, role: decoded.role };

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token Inválido.' });
        }
        return res.status(500).json({ message: 'Erro ao verificar o token.' });
    }
};
