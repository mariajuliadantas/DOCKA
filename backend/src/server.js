import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import 'pdfjs-dist/legacy/build/pdf.worker.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const app = express();

app.get('/', (req, res) => {
    res.json({ mensagem: 'Backend do DOCKA rodando! Acesse /upload para funcionalidades.' });
});

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); 

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log('Requisição recebida na rota /upload!');
    console.log('File:', req.file);

    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        let textoExtraido = '';

        if (req.file.mimetype === 'application/pdf') {
            const uint8Array = new Uint8Array(dataBuffer);
            const loadingTask = getDocument({
                data: uint8Array,
                useWorkerFetch: false,
                isEvalSupported: false,
                disableFontFace: true,
            });
            const pdfDoc = await loadingTask.promise;
            console.log(`PDF carregado: ${pdfDoc.numPages} página(s)`);

            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const content = await page.getTextContent();
                textoExtraido += content.items.map(item => item.str).join(' ') + '\n';
            }
            textoExtraido = textoExtraido.trim();
            console.log('Texto extraído (100 chars):', textoExtraido.substring(0, 100));

        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
            const PptxGenJS = require('pptxgenjs');
            const pptx = new PptxGenJS();
            await pptx.load(dataBuffer);
            pptx.getSlides().forEach(slide => {
                slide.getShapes().forEach(shape => {
                    if (shape.text) textoExtraido += shape.text + '\n';
                });
            });
            textoExtraido = textoExtraido.trim();
            console.log('Texto extraído de PPTX (100 chars):', textoExtraido.substring(0, 100));

        } else {
            throw new Error('Formato não suportado para extração');
        }

        let resumo = '';
        if (textoExtraido) {
            console.log('Iniciando geração de resumo com Gemini...');
            const prompt = `Faça um resumo conciso deste texto de slides: ${textoExtraido}`;
            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                resumo = response.text();
                console.log('Resumo gerado com sucesso pela IA.');
            } catch (geminiError) {
                console.error('Erro específico na chamada do Gemini:', geminiError);
                throw new Error('Falha ao gerar resumo com Gemini: ' + geminiError.message);
            }
        } else {
            console.log('Nenhum texto extraído para resumir.');
        }

        fs.unlinkSync(req.file.path);
        console.log('Arquivo temporário deletado.');

        res.json({ mensagem: 'Upload e resumo com sucesso!', arquivo: req.file.filename, resumo });

    } catch (error) {
        console.error('Erro no processamento:', error);
        res.status(500).json({ error: 'Erro ao processar o arquivo ou gerar resumo' });
    }
});

export default app;