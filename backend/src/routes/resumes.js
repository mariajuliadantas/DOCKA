import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {  //fica no /resumes, se fosse /resumes/ seria no /resumes/resumes
    res.json([{ id: 1, titulo: 'Resumo 1' }, { id: 2, titulo: 'Resumo 2' }, { id: 3, titulo: 'Resumo 3' }]);
});

export default router;