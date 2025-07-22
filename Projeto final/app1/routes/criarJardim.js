// routes/criarJardim.js
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
    // 🌻 Primeiro vaso com Girassol plantado
    const vasos = [
      {
        planta: 'Girassol',
        dataPlantio: new Date(),
        estado: 'plantado'
      }
    ];

    // 🪴 Preenche os demais vasos vazios (total de 6 vasos)
    while (vasos.length < 6) {
      vasos.push({
        planta: null,
        dataPlantio: null,
        estado: 'vazio'
      });
    }

    // 🌼 Criação do jardim
    const novoJardim = new Garden({
      nome,
      dono: req.user.id,
      vasos
    });

    await novoJardim.save();

    res.redirect('/api/home'); // Redireciona após criação
  } catch (err) {
    console.error('Erro ao criar jardim:', err.message);
    res.status(500).json({ message: 'Erro ao criar jardim', error: err.message });
  }
});

module.exports = router;
