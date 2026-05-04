import React, { useState } from 'react';  // No topo
import axios from 'axios';  // No topo (instalado no package.json)

const UploadComponent = () => {  
    const [file, setFile] = useState(null);  
    const [mensagem, setMensagem] = useState('');  
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {  
        const selectedFile = event.target.files[0]; 
        if (selectedFile) {
            setFile(selectedFile);
            setMensagem(`Arquivo selecionado: ${selectedFile.name}`);  
        } else {
            setMensagem('Nenhum arquivo selecionado.');
        }
    };

    const handleUpload = async () => {  
        if (!file) {
            setMensagem('Selecione um arquivo primeiro!'); 
            return;   
        } 

        const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        if (!allowedTypes.includes(file.type)) {
            setMensagem('Tipo de arquivo inválido! Apenas PDF, PPT ou PPTX são permitidos.');  
            return;  
        }

        setLoading(true);
        setMensagem('Carregando...');

        const formData = new FormData();  
        formData.append('file', file);  

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {  
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMensagem(`${response.data.mensagem}\nResumo: ${response.data.resumo}`);  
        } catch (error) {  
            setMensagem(`Erro no upload: ${error.message}`);  
            console.error('Erro no axios:', error);  
        } finally {
            setLoading(false);  
        }
    };

    return (  
        <div style={{ textAlign: 'center', marginTop: '50px' }}>  
            <h1>DOCKA - Upload de Slides</h1>
            <input type="file" accept=".pdf,.ppt,.pptx" onChange={handleFileChange} />  
            <button onClick={handleUpload} disabled={loading}>  
                Enviar Upload
            </button>  
            <p>{mensagem}</p> 
        </div>
    );
};

export default UploadComponent;