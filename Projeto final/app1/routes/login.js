const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Garden = require('../models/Garden'); // ← Importa o modelo de jardim


const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

// 👤 Tela de login
router.get('/', (req, res) => {
  res.render('login'); // renderiza a view de login
});

// 🔐 Processa o login
router.post('/', async (req, res) => {
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
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    });

// 🌱 Verifica se o usuário já tem jardim
    const jardins = await Garden.find({ dono: user._id });

    if (jardins.length === 0) {
      res.redirect('/criarJardim');
    } else {
      res.redirect('/api/home');
    } 


  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
});

module.exports = router;
