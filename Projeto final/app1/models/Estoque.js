const mongoose = require('mongoose');

const lojaItemSchema = new mongoose.Schema({
  planta: { type: mongoose.Schema.Types.ObjectId, ref: 'Planta' },
  preco: Number,
  quantidadeDisponivel: Number
});

module.exports = mongoose.model('LojaItem', lojaItemSchema);
