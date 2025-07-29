const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const Garden = require('../models/Garden.js');
const Planta = require('../models/Planta.js');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async function(req, res) {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // 🌱 Criação automática do jardim
    const girassol = await Planta.findOne({ nome: 'Girassol' });

    if (!girassol) {
      return res.status(404).json({ message: 'Planta Girassol não encontrada.' });
    }

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

    const jardim = new Garden({
      nome: 'Jardim do ' + username,
      dono: newUser._id,
      vasos
    });

    await jardim.save();

    const jwt = require('jsonwebtoken');
    const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

    // Gera o token para o novo usuário
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });

    // Armazena o token em cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    });


    res.redirect('/api/home'); // Ou renderiza uma página de sucesso, se quiser
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário ou jardim', error: err.message });
  }
});

module.exports = router;
