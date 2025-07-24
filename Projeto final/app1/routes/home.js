const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const User = require('../models/User');
const Garden = require('../models/Garden');
const Planta = require('../models/Planta');
const { calcularOxigenioPassivo } = require('../scripts/calcularOxigenioPass');

router.get('/home', authenticateToken, async (req, res) => {
  try {
    const jardim = await Garden.findOne({ dono: req.user.id });
    const user = await User.findById(req.user.id).populate('inventario.planta');
    const plantasDB = await Planta.find({});

    const oxigenioNovo = calcularOxigenioPassivo(jardim, plantasDB, user.dataUltimaColeta);
    user.oxigenioTotal += oxigenioNovo;
    user.dataUltimaColeta = new Date();

    await user.save();

    res.render('home', {
      usuarioId: req.user.id,
      jardins: [jardim],
      oxigenioTotal: user.oxigenioTotal,
      inventario: user.inventario
    });

  } catch (err) {
    console.error('Erro ao carregar home:', err.message);
    res.status(500).json({ message: 'Erro ao carregar página Home', error: err.message });
  }
});

router.post('/plantar', authenticateToken, async (req, res) => {
  const { vasoIndex, plantaNome } = req.body;

  try {
    const user = await User.findById(req.user.id).populate('inventario.planta');
    const jardim = await Garden.findOne({ dono: req.user.id });

    if (!jardim || !jardim.vasos[vasoIndex]) {
      return res.status(404).send('Vaso não encontrado.');
    }

    const item = user.inventario.find(i => i.planta.nome === plantaNome);

    if (!item || item.quantidade <= 0) {
      return res.status(400).send('Planta não disponível no inventário.');
    }

    // 🌱 Plantar
    jardim.vasos[vasoIndex].planta = plantaNome;
    jardim.vasos[vasoIndex].dataPlantio = new Date();
    item.quantidade -= 1;

    await jardim.save();
    await user.save();

    res.redirect('/api/home'); // Volta pra tela do jardim
  } catch (err) {
    console.error('Erro ao plantar:', err.message);
    res.status(500).send('Erro interno ao plantar.');
  }
});


module.exports = router;
