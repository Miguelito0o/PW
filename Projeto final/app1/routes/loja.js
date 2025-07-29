const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Planta = require('../models/Planta');
const User = require('../models/User');
const Garden = require('../models/Garden')

const { obterEstacaoAtual } = require('../scripts/sazonalidade.js');


// 🌿 GET: Exibe a loja com todas as plantas
router.get('/loja', authenticateToken, async (req, res) => {
  try {
    const plantas = await Planta.find({});
    const user = await User.findById(req.user.id);
    const jardim = await Garden.findOne({ dono: req.user.id }).populate('vasos.planta');

    res.render('loja', {
      jardim,
      plantas,
      oxigenioTotal: user.oxigenioTotal,
    });
  } catch (err) {
    console.error('Erro ao carregar loja:', err.message);
    res.status(500).json({ error: 'Erro ao exibir loja' });
  }
});

// 🛍️ POST: Compra de planta
router.post('/comprar', authenticateToken, async (req, res) => {
  const { plantaId } = req.body;

  try {
    const user = await User.findById(req.user.id).populate('inventario.planta');
    const planta = await Planta.findById(plantaId);

    if (!planta) {
      return res.status(404).json({ error: 'Planta não encontrada.' });
    }

    if (user.oxigenioTotal < planta.preco) {
      return res.status(400).json({ error: 'Oxigênio insuficiente para comprar esta planta.' });
    }

    // 💨 Atualiza oxigênio
    user.oxigenioTotal -= planta.preco;

    // 🌱 Atualiza inventário
    const existente = user.inventario.find(item => item.planta._id.equals(planta._id));
    if (existente) {
      existente.quantidade += 1;
    } else {
      user.inventario.push({ planta: planta._id, quantidade: 1 });
    }

    await user.save();
    res.redirect('/api/loja');
  } catch (err) {
    console.error('Erro ao comprar planta:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// 🔄 Exporta as rotas da loja
module.exports = router;
