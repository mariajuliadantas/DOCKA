import app from './server.js';

import resumesRoutes from './routes/resumes.js';

app.use('/resumes', resumesRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});