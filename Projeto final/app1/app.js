const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

// Middleware de autenticação
const authenticateToken = require('./middleware/authMiddleware');

// Rotas
const indexRouter     = require('./routes/index');
const loginRouter     = require('./routes/login');
const signupRouter    = require('./routes/signup');
const usersRouter     = require('./routes/users');
const criarJRouter    = require('./routes/criarJardim');
const homeRouter      = require('./routes/home');
const lojaRouter      = require('./routes/loja');
const configRouter    = require('./routes/configuracoes');
const catalogoRouter  = require('./routes/catalogo');
const novoJRouter     = require('./routes/novoJardim');

// App
const app = express();

// ✅ Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/myLittleGarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// 🔧 Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 🔐 Middleware condicional (protege todas as rotas, exceto públicas)
app.use((req, res, next) => {
  const rotasPublicas = ['/', '/login', '/signup'];

  const rotaLiberada = rotasPublicas.some((publica) => req.path.startsWith(publica));

  if (rotaLiberada) {
    return next(); // rota pública
  }

  return authenticateToken(req, res, next); // rota protegida
});


// 🌐 Rotas públicas
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

// 🌐 Rotas protegidas
app.use('/users', usersRouter);
app.use('/criarJardim', criarJRouter);
app.use('/api', homeRouter);
app.use('/api', lojaRouter);
app.use('/api', configRouter);
app.use('/api', catalogoRouter);
app.use('/api', novoJRouter);

// 🔎 404
app.use((req, res, next) => {
  next(createError(404));
});

// ❌ Tratamento de erro
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
