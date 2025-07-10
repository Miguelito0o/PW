const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Garden = require('../models/Garden');

router.get('/home', authenticateToken, async (req, res) => {
  try {
    const jardins = await Garden.find({ dono: req.user.id });

    // 🌱 Log para debug (opcional)
    console.log(`Usuário ${req.user.id} tem ${jardins.length} jardim(ns).`);

    res.render('home', {
      usuarioId: req.user.id,
      jardins
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
