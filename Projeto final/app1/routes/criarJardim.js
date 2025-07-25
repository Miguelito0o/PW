const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Garden = require('../models/Garden');
const Planta = require('../models/Planta'); // ✅ importa o modelo de planta

router.get('/', authenticateToken, (req, res) => {
  res.render('criarJardim', { usuarioId: req.user.id });
});

router.post('/', authenticateToken, async (req, res) => {
  const { nome } = req.body;

  try {
    // ✅ Buscar a planta "Girassol" no banco
    const girassol = await Planta.findOne({ nome: 'Girassol' });

    if (!girassol) {
      return res.status(404).send('Planta Girassol não encontrada.');
    }

    // 🌻 Primeiro vaso com planta correta
    const vasos = [
      {
        planta: girassol._id, // ✅ usa o ObjectId correto
        dataPlantio: new Date(),
        estado: 'plantado'
      }
    ];

    // 🪴 Preenche os demais vasos vazios
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

    res.redirect('/api/home');
  } catch (err) {
    console.error('Erro ao criar jardim:', err.message);
    res.status(500).json({ message: 'Erro ao criar jardim', error: err.message });
  }
});

module.exports = router;
