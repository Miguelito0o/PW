var express = require('express');
var router = express.Router();
const authenticateToken = require('../middleware/signmidlleware');

router.get('/home', authenticateToken, (req, res) => {
  res.json({
    message: `🌿 Bem-vindo ao seu jardim, usuário ${req.user.id}`
  });
});

module.exports = router;
