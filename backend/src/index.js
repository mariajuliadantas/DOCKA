import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json({ mensagem: 'DOCKA backend rodando' });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});