const mongoose = require('mongoose');
const vasoSchema = require('./Vaso.js');


const gardenSchema = new mongoose.Schema({
  nome: String,
  dono: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vasos: [vasoSchema],
  estacaoAtual: {
  type: String,
  enum: ['primavera', 'verao', 'outono', 'inverno'],
  default: 'verao'
}
});

module.exports = mongoose.model('Garden', gardenSchema);
