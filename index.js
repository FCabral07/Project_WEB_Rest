"use strict";

// Importações
const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./src/routers/userRouter");
const productRouter = require("./src/routers/productRouter");
const pedidoRouter = require("./src/routers/pedidoRoute");
const promocaoRouter = require("./src/routers/promocaoRoute");

// Conectando o mongoose
mongoose.connect(
  "mongodb+srv://arthurpenha:devhouse@devhouse.jdojpuo.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Criando o app e definindo para usar os routers
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(pedidoRouter);
app.use(productRouter);
app.use(promocaoRouter);
// app.use(authRouter);

// Definindo a porta
const port = 3333;

// Iniciar o servidor
app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
