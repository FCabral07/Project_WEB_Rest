// Importando o mongoose e o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;  // Número de rounds do meu HASH

// Model do usuário/funcionário:
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String},
    cpf: {type: String, required: true, unique: true},
    // Com o select false eu digo ao meu código para não retornar esse valor em
    // consultas REST
    password: {type: String, required: true, select: false},
    salary: {type: Number},
    // Defino se é usuário ou funcionário
    role: {type: String, lowercase: true}
    // Espaço para criar um histórico de compras
});

// Criptogrando a senha
userSchema.pre('save', async function (next){
    // Verifica o campo password no BD, se foi modificado
    if(this.isModified('password')){
        try{
            // Gera a senha criptografada/hasheada (nao sei se existe essa palavra)
            const hashedPassword = await bcrypt.hash(this.password, saltRounds)

            // Substituo a senha por ela criptografada
            this.password = hashedPassword
            next()
        }catch(err){
            next(err)
        }
    }else{
        next()
    }
})

// Exportando o model
module.exports = mongoose.model('User', userSchema);