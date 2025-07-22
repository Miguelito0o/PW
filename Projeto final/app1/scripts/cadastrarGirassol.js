const mongoose = require('mongoose');
const Planta = require('../models/Planta');

mongoose.connect('mongodb://localhost:27017/myLittleGarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const girassol = {
  nome: 'Girassol',
  imagem: 'girassol.png',
  descricao: 'Planta radiante que cresce voltada para o sol.',
  oxigeniopm: 2,
  preco: 0 // gratuito
};

Planta.findOne({ nome: 'Girassol' }).then((existe) => {
  if (!existe) {
    Planta.create(girassol).then(() => {
      console.log('🌻 Girassol cadastrado!');
      mongoose.connection.close();
    });
  } else {
    console.log('🌻 Girassol já existe.');
    mongoose.connection.close();
  }
});
