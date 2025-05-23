const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAlumnosPorCurso,
  getAlumnosPorDivision,
  getAlumno,
  createAlumno,
  updateAlumno,
  deleteAlumno
} = require('../controllers/alumnos.controller');

router.use(authMiddleware);

// Alumnos por curso completo (sin importar división)
router.get('/cursos/:cursoId/alumnos', getAlumnosPorCurso);

// Alumnos por división
router.get('/', getAlumnosPorDivision);
router.get('/:id', getAlumno);
router.post('/', createAlumno);
router.put('/:id', updateAlumno);
router.delete('/:id', deleteAlumno);

module.exports = router;
