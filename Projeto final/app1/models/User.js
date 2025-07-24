const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  inventario: [
    {
      planta: {type: mongoose.Schema.Types.ObjectId, ref: 'Planta'},
      quantidade: Number,
  }
  ],
  oxigenioTotal: { type: Number, default: 0 },
  dataUltimaColeta: {
    type: Date,
    default: Date.now
  },
  historicoCompras: [{
  planta: { type: mongoose.Schema.Types.ObjectId, ref: 'Planta' },
  quantidade: Number,
  data: Date
  }]
 
});

module.exports = mongoose.model('User', userSchema);
