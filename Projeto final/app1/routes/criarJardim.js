const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, (req, res) => {
  res.render('criarJardim', { usuarioId: req.user.id });
});

router.post('/', authenticateToken, async (req, res) => {
});

module.exports = router;