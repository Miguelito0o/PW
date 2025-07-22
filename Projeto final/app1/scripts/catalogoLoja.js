// scripts/catalogoLoja.js
const mongoose = require('mongoose');
const Planta = require('../models/Planta');

mongoose.connect('mongodb://localhost:27017/myLittleGarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const novasPlantas = [
  {
    nome: 'Cacto Solar',
    imagem: 'cacto.png',
    descricao: 'Sobrevive em calor intenso e gera oxigênio rápido.',
    oxigeniopm: 3,
    preco: 25
  },
  {
    nome: 'Bonsai Zen',
    imagem: 'bonsai.png',
    descricao: 'Planta meditativa de crescimento lento, mas poderosa.',
    oxigeniopm: 7,
    preco: 90
  },
  {
    nome: 'Samambaia Alegre',
    imagem: 'samambaia.png',
    descricao: 'Verde vibrante e alegre, ideal para todos os vasos.',
    oxigeniopm: 1,
    preco: 20
  }
];

Planta.insertMany(novasPlantas).then(() => {
  console.log('🛒 Catálogo da loja populado!');
  mongoose.connection.close();
});
