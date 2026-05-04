import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
    console.log('Listando modelos disponíveis...');
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // O SDK não tem um método direto listModels no objeto genAI, 
        // mas podemos tentar usar a API REST ou ver se há algo no genAI.
        // Na verdade, o SDK expõe o endpoint.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erro ao listar modelos:', error);
    }
}

listModels();
