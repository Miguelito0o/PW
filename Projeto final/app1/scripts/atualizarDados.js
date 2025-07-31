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
      descricao: 'Uma flor bela que acompanha o movimento da luz solar e traz vida ao jardim.',
      oxigeniopm: 1,
      preco: 20,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'cacto' },
    {
      imagem: 'cacto.png',
      descricao: 'Planta resistente á secas e climas quentes.',
      oxigeniopm: 5,
      preco: 100,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'samambaia' },
    {
      imagem: 'samambaia.png',
      descricao: 'Uma ótima produtora de gás oxigênio, gosta de umidade e regas constantes',
      oxigeniopm: 6,
      preco: 150,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'rosa' },
    {
      imagem: 'rosa.png',
      descricao: 'Uma ótima opção para deixar seu jardim mais bonito',
      oxigeniopm: 2,
      preco: 350,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );
  
  await Planta.findOneAndUpdate(
    { nome: 'tulipa' },
    {
      imagem: 'tulipa.png',
      descricao: '',
      oxigeniopm: 2.5,
      preco: 450,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'bonsai' },
    {
      imagem: 'bonsai.png',
      descricao: 'Um tipo fofo de mini árvore, produz oxigênio com eficiência',
      oxigeniopm: 15,
      preco: 1000,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'orquidea' },
    {
      imagem: 'orquidea.png',
      descricao: '',
      oxigeniopm: 3,
      preco: 525,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'bromelia' },
    {
      imagem: 'bromelia.png',
      descricao: '',
      oxigeniopm: 3.5,
      preco: 750,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'babosa' },
    {
      imagem: 'babosa.png',
      descricao: '',
      oxigeniopm: 5,
      preco: 235,
      estacoesPermitidas: ['todas']
    },
    { upsert: true }
  );

  await Planta.findOneAndUpdate(
    { nome: 'cravo' },
    {
      imagem: 'cravo.png',
      descricao: '',
      oxigeniopm: 2.5,
      preco: 625,
      estacoesPermitidas: ['todas']
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
