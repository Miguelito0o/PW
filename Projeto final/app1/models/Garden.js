const mongoose = require('mongoose');

const gardenSchema = new mongoose.Schema({
  nome: String,
  dono: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vasos: [
    {
      planta: { type: String, default: null },
      dataPlantio: { type: Date, default: null },
      estado: { type: String, default: 'vazio' } // ex: 'plantado', 'crescendo'
    }
  ]
});

module.exports = mongoose.model('Garden', gardenSchema);
