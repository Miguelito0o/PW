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

module.exports = router;
