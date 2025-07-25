const mongoose = require('mongoose');

const vasoSchema = new mongoose.Schema({
  planta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planta'
  },
  dataPlantio: Date
});

module.exports = vasoSchema; // Exporta como ESQUEMA, não como modelo completo
