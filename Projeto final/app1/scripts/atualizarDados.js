// scripts/updateDados.js
const mongoose = require('mongoose');
const Planta = require('../models/Planta');
const Garden = require('../models/Garden');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/myLittleGarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('🔗 Conectado ao MongoDB');

  await Planta.findOneAndUpdate(
    { nome: 'Girassol' },
    {
      imagem: 'girassol.png',
      descricao: 'Planta solar clássica que introduz os novos jardineiros no mundo verde.',
      oxigeniopm: 1,
      preco: 0,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'cacto' },
    {
      imagem: 'cacto.png',
      descricao: '.',
      oxigeniopm: 2,
      preco: 150,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'samambaia' },
    {
      imagem: 'samambaia.png',
      descricao: '',
      oxigeniopm: 2.3,
      preco: 450,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'rosa' },
    {
      imagem: 'rosa.png',
      descricao: '',
      oxigeniopm: 0.6,
      preco: 750,
      estacoesPermitidas: ['primavera']
    },
    { upsert: true }
  );

  // 🌼 Atualiza jardim do usuário
  const usuario = await User.findOne(); // ajuste aqui se tiver o ID específico

  if (usuario) {
    const jardimExistente = await Garden.findOne({ dono: usuario._id });
    if (jardimExistente) {
      jardimExistente.estacaoAtual = 'primavera';
      await jardimExistente.save();
      console.log('🌿 Jardim atualizado para primavera');
    } else {
      console.log('⚠️ Usuário encontrado, mas não possui jardim');
    }
  } else {
    console.log('❌ Nenhum usuário encontrado no sistema');
  }

  console.log('✅ Dados atualizados com sucesso');
  mongoose.disconnect();
}).catch(err => {
  console.error('Erro na atualização:', err.message);
});
