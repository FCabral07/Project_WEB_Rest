'use strict'

// Importações
const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./src/routers/userRouter');
const productRouter = require('./src/routers/productRouter');
const promotionRouter = require('./src/routers/promotionRouter');


// Conectando o mongoose
mongoose.connect('mongodb://127.0.0.1:27017/project');

// Criando o app e definindo para usar os routers
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(promotionRouter);

// Definindo a porta
const port = process.env.PORT || 3000;
  
// Iniciar o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});