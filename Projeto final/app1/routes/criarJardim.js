const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Garden = require('../models/Garden');
const Planta = require('../models/Planta');

router.post('/criarJardim', authenticateToken, async (req, res) => {
  const { nome } = req.body;

  try {
    const girassol = await Planta.findOne({ nome: 'Girassol' });

    if (!girassol) {
      return res.status(404).send('Planta Girassol não encontrada.');
    }

    // 🪴 Inicializa os 6 vasos
    const vasos = [
      {
        planta: girassol._id,
        dataPlantio: new Date(),
        estado: 'plantado'
      },
      ...new Array(5).fill({
        planta: null,
        dataPlantio: null,
        estado: 'vazio'
      })
    ];

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
