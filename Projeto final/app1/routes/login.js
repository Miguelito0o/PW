const express = require('express');
const router = express.Router();
const User = require('../models/User'); // modelo do usuário
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async function(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });

    res.redirect('/home');
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
});

module.exports = router;
