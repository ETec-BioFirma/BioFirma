const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getCursos,
  getCurso,
  createCurso,
  updateCurso,
  deleteCurso
} = require('../controllers/cursos.controller');

router.use(authMiddleware);

router.get('/', getCursos);
router.get('/:id', getCurso);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);

module.exports = router;
