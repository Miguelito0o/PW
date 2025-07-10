const mongoose = require('mongoose');

const plantaSchema = new mongoose.Schema({
    nome : String,
    imagem: String,
    descricao: String,
    oxigeniopm: Number,
    preco: Number
});

module.exports = mongoose.model('Planta', plantaSchema);