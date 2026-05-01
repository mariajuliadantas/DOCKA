import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
    res.json({ mensagem: 'Backend do DOCKA rodando! Acesse /upload para funcionalidades.' });  // Fix: Adicionei conteúdo ao json() para evitar erro.
});

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({  
    destination: (req, file, cb) => cb(null, 'uploads/'), 
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) 
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => { 
    console.log('Requisição recebida na rota /upload!');  // Log para confirmar hit.
    console.log('Headers:', req.headers); 
    console.log('Body:', req.body); 
    console.log('File:', req.file);
    if (!req.file) {  
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    console.log('Arquivo recebido:', req.file);  
    res.json({ mensagem: 'Upload realizado com sucesso!', arquivo: req.file.filename });    
});

export default app;