const mongoose = require('mongoose');

const plantaSchema = new mongoose.Schema({
    nome : String,
    imagem: String,
    descricao: String,
    oxigeniopm: Number,
    preco: Number,
    estacoesPermitidas: {
        type: [String],
        enum: ['primavera', 'verao', 'outono', 'inverno', 'todas'],
        default: ['todas']
    }
});

module.exports = mongoose.model('Planta', plantaSchema);