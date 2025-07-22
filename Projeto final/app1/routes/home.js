const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Garden = require('../models/Garden');
const User = require('../models/User'); // IMPORTANTE!

router.get('/home', authenticateToken, async (req, res) => {
  try {
    const jardins = await Garden.find({ dono: req.user.id });
    const user = await User.findById(req.user.id).populate('inventario.planta');

    res.render('home', {
      usuarioId: req.user.id,
      jardins,
      oxigenioTotal: user.oxigenioTotal,
      inventario: user.inventario // isso precisa estar presente pra popular os <select>
    });
  } catch (err) {
    console.error('Erro ao carregar jardins:', err.message);
    res.status(500).json({
      message: 'Erro ao carregar a página Home',
      error: err.message
    });
  }
});

module.exports = router;
