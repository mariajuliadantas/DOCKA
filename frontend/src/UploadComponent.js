import React, { useState } from 'react';  
const App = () => {  // Define o componente como arrow function (por quê? Mais conciso para funções sem 'this', comum em React moderno 
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

    const handleSimulateUpload = () => {  // Arrow function para onClick: simula upload e atualiza mensagem 
        if (!file) {
          setMensagem('Selecione um arquivo primeiro!'); 
          return;   
        } 
        else {
          setLoading(true);
          setMensagem('Carregando...');
          setTimeout(()=>{
            setMensagem(`Simulando upload de ${file.name}... Sucesso!`);  
          console.log("Arquivo simulado:",file);  
          },2000)
          
        }
    };

    return (  
        <div style={{ textAlign: 'center', marginTop: '50px' }}>  
            <h1>DOCKA - Upload de Slides</h1>
            <input type="file" accept=".pdf,.ppt,.pptx" onChange={handleFileChange} />  
            <button onClick={handleSimulateUpload}>Simular Upload</button>  
            <p>{mensagem}</p> 
        </div>
    );
};

export default App;