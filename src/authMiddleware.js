// Realizando importações
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { User, Employee } = require('./models/userModel')

dotenv.config({path: 'config.env'})

// Definindo a função de token para usuário
function tokenForUser(user){
    return jwt.sign(
        {name: User.name, role: 'user'},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

// Definindo a função de token para empregado
function tokenForEmployee(employee){
    return jwt.sign(
        {name: Employee.name, role: 'employee'},
        process.env.SECRET_KEY,
        {expiresIn: '9h'}
    )
}

module.exports = (req, res, next) => {
    // Recebendo o token
    const token = req.header('Authorization')

    // Se o sistema não encontrar o token
    if(!token){
        return res.status(401).json({message: 'Token Ausente.'})
    }

    // Sistema encontra o token e entra no try catch
    try{
        // Uso a função do jwt decode para decodificar o token, uso o split para obter
        // apenas o conteúdo do token, tirando o 'Bearer' que vem na frente 
        // (o mais difícil foi descobrir que vinha essa palavra na frente)
        const decodeToken = jwt.decode(token.split(' ')[1])
        

        // Verifico através do token decodificado se é um usuário ou employee
        if(decodeToken.role === 'user'){
            const userToken = tokenForUser(decodeToken)
            req.userToken = userToken;
        }else if (decodeToken.role === 'employee') {
            const employeeToken = tokenForEmployee(decodeToken);
            req.employeeToken = employeeToken;
        }

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