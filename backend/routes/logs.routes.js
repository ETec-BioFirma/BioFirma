const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getLogs, exportarLogs } = require('../controllers/logs.controller');

router.use(authMiddleware);

router.get('/', getLogs);
router.get('/exportar', exportarLogs);

module.exports = router;
