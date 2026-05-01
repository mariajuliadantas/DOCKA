import express from 'express';

const app = express();

app.use(express.json()); //executam em pilhas e tem que executar em ordem

app.get('/', (req, res) => {
    res.json({ mensagem: 'DOCKA backend rodando' });
});

app.post('/test', (req, res) => {  
    console.log('Dados recebidos:', req.body); 
    if (!req.body) {  
        return res.status(400).json({ mensagem: 'Nenhum dado enviado' });
    }
    res.json({ mensagem: 'POST realizado com sucesso!', recebido: req.body }); 
});

export default app;