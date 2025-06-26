const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

// Rota que busca a mensagem da API
app.post('/mensagem', async (req, res) => {
  try {
    const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
    const quote = response.data[0];
    res.render('quote', { msg: quote });
  } catch (error) {
    console.error(error);
    res.send('Erro ao acessar a API Ron Swanson.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
