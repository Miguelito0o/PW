const mongoose = require('mongoose');

const vasoSchema = new mongoose.Schema({
  planta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planta'
  },
  dataPlantio: Date,
  estado: { type: String, default: 'vazio' },
});

module.exports = vasoSchema; // Exporta como ESQUEMA, não como modelo completo
