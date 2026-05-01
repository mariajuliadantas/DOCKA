import React, { useState } from 'react';  // Importa React e useState para gerenciar estados reativos 

const App = () => {  // Define o componente como arrow function (por quê? Mais conciso para funções sem 'this', comum em React moderno)
    const [file, setFile] = useState(null);  
    const [mensagem, setMensagem] = useState('');  
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {  // Arrow function para onChange: atualiza estado com o arquivo selecionado
        const selectedFile = event.target.files[0]; 
        if (selectedFile) {
            setFile(selectedFile);
            setMensagem(`Arquivo selecionado: ${selectedFile.name}`);  
        } else {
            setMensagem('Nenhum arquivo selecionado.');
        }
    };

    const handleSimulateUpload = () => {  // Arrow function para onClick: simula upload com delay e loading 
        if (!file) {
          setMensagem('Selecione um arquivo primeiro!'); 
          return;   
        } 

        // Validação de tipo: Checa MIME types permitidos (PDF, PPT, PPTX) antes de prosseguir 
        const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        if (!allowedTypes.includes(file.type)) {
            setMensagem('Tipo de arquivo inválido! Apenas PDF, PPT ou PPTX são permitidos.');  
            return;  
        }

        
        setLoading(true);
        setMensagem('Carregando...');
        setTimeout(() => {
            setMensagem(`Simulando upload de ${file.name}... Sucesso!`);  
            console.log("Arquivo simulado:", file);  
            setLoading(false);  // Desativa loading após delay (ajuste anterior mantido) 
        }, 2000);
    };

    return (  
        <div style={{ textAlign: 'center', marginTop: '50px' }}>  
            <h1>DOCKA - Upload de Slides</h1>
            <input type="file" accept=".pdf,.ppt,.pptx" onChange={handleFileChange} />  
            <button onClick={handleSimulateUpload} disabled={loading}>  
                Simular Upload
            </button>  
            <p>{mensagem}</p> 
        </div>
    );
};

export default App;  