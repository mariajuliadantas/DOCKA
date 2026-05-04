import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGemini() {
    console.log('Testando Gemini API...');
    console.log('API Key:', process.env.GEMINI_API_KEY ? 'Presente' : 'Ausente');
    
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
        const result = await model.generateContent('Olá, responda com apenas uma palavra: Sucesso.');
        const response = await result.response;
        console.log('Resposta do Gemini:', response.text());
    } catch (error) {
        console.error('Erro no teste do Gemini:', error);
    }
}

testGemini();
