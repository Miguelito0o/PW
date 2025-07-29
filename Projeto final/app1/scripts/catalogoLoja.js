// scripts/catalogoLoja.js
const mongoose = require('mongoose');
const Planta = require('../models/Planta');

mongoose.connect('mongodb://localhost:27017/myLittleGarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const novasPlantas = [
  {
    nome: 'cacto',
    imagem: 'cacto.png',
    descricao: 'Sobrevive em calor intenso e gera oxigênio rápido.',
    oxigeniopm: 1.2,
    preco: 350,
    estacaoPermitida: ['todas']
  },
  {
    nome: 'samambaia',
    imagem: 'samambaia.png',
    descricao: '',
    oxigeniopm: 2,
    preco: 320,
    estacaoPermitida: ['todas']
  },
  {
    nome: 'Rosa',
    imagem: 'rosa.png',
    descricao: '',
    oxigeniopm: 0.5,
    preco: 65,
    estacaoPermitida: ['verao']
  }
];

Planta.insertMany(novasPlantas).then(() => {
  console.log('🛒 Catálogo da loja populado!');
  mongoose.connection.close();
});
