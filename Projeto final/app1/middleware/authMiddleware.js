// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

function authenticateToken(req, res, next) {
  const token = req.cookies.token || (
  req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
  );

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = user; // Adiciona os dados do usuário à requisição
    next();
  });
}

module.exports = authenticateToken;
