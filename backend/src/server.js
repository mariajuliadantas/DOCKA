import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({  // Configura armazenamento de arquivos, salva em disco para processamento, como extração de texto no DOCKA
    destination: (req, file, cb) => cb(null, 'uploads/'), 
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) 
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {  
    if (!req.file) {  
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    console.log('Arquivo recebido:', req.file);  // Log para depuração
    res.json({ mensagem: 'Upload realizado com sucesso!', arquivo: req.file.filename }); 
});

export default app;