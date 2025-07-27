const mongoose = require('mongoose');
const vasoSchema = require('./Vaso.js');


const gardenSchema = new mongoose.Schema({
  nome: String,
  dono: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vasos: [vasoSchema]
});

module.exports = mongoose.model('Garden', gardenSchema);
