import express from 'express';
const app = express();

import resumesRoutes from './routes/resumes.js';

app.use('/resumes', resumesRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'DOCKA backend rodando' });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

