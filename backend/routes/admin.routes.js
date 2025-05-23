const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  getUsuarios,
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarPassword,
  activarUsuario,
  desactivarUsuario
} = require('../controllers/admin.controller');

// 🛡 Protegido por login + rol
router.use(authMiddleware);
router.use(roleMiddleware);

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuario);
router.post('/usuarios', crearUsuario);
router.put('/usuarios/:id', actualizarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);
router.post('/usuarios/:id/password', cambiarPassword);
router.post('/usuarios/:id/activar', activarUsuario);
router.post('/usuarios/:id/desactivar', desactivarUsuario);

module.exports = router;
