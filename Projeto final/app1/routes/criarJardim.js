const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Garden = require('../models/Garden');

router.get('/', authenticateToken, (req, res) => {
  res.render('criarJardim', { usuarioId: req.user.id });
});

router.post('/', authenticateToken, async (req, res) => {
  const { nome } = req.body;

  try {
    const novoJardim = new Garden({
      nome,
      dono: req.user.id,
      vasos: Array(6).fill({
        planta: null,
        dataPlantio: null,
        dataRegado: null,
        estado: 'vazio'
      })
    });

    await novoJardim.save();

    res.redirect('/api/home'); // Redireciona após criação
  } catch (err) {
    console.error('Erro ao criar jardim:', err.message);
    res.status(500).json({ message: 'Erro ao criar jardim', error: err.message });
  }
});

module.exports = router;