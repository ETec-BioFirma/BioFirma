const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getHistorial, exportarHistorial } = require('../controllers/historial.controller');

router.use(authMiddleware);

router.get('/', getHistorial);
router.get('/exportar', exportarHistorial);

module.exports = router;
