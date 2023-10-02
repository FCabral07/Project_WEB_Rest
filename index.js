'use strict'

// Importações
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routers/userRouter');
const productRouter = require('./src/routers/productRouter');
const promotionRouter = require('./src/routers/promotionRouter');
const pedidoRouter = require('./src/routers/pedidoRoute')


// Conectando o mongoose
mongoose.connect('mongodb://127.0.0.1:27017/restMarket');

// Criando o app e definindo para usar os routers
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(productRouter);
app.use(promotionRouter);
app.use(pedidoRouter);

// Definindo a porta
const port = process.env.PORT || 3000;
  
// Iniciar o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});