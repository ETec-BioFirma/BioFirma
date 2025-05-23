const db = require('../db');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  const [rows] = await db.query('SELECT id, nombre, usuario, rol FROM autoridades');
  res.json(rows);
};

// Obtener un usuario específico
exports.getUsuario = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query('SELECT id, nombre, usuario, rol FROM autoridades WHERE id = ?', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(rows[0]);
};

// Crear nuevo usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, usuario, password, rol } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO autoridades (nombre, usuario, password_hash, rol) VALUES (?, ?, ?, ?)', [nombre, usuario, hash, rol]);
  res.status(201).json({ message: 'Usuario creado correctamente' });
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, usuario, rol } = req.body;
  await db.query('UPDATE autoridades SET nombre = ?, usuario = ?, rol = ? WHERE id = ?', [nombre, usuario, rol, id]);
  res.json({ message: 'Usuario actualizado' });
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM autoridades WHERE id = ?', [id]);
  res.json({ message: 'Usuario eliminado' });
};

// Cambiar contraseña
exports.cambiarPassword = async (req, res) => {
  const { id } = req.params;
  const { nuevaPassword } = req.body;
  const hash = await bcrypt.hash(nuevaPassword, 10);
  await db.query('UPDATE autoridades SET password_hash = ? WHERE id = ?', [hash, id]);
  res.json({ message: 'Contraseña actualizada' });
};

// Activar usuario (si usás un campo activo = 1/0)
exports.activarUsuario = async (req, res) => {
  const { id } = req.params;
  await db.query('UPDATE autoridades SET activo = 1 WHERE id = ?', [id]);
  res.json({ message: 'Usuario activado' });
};

// Desactivar usuario
exports.desactivarUsuario = async (req, res) => {
  const { id } = req.params;
  await db.query('UPDATE autoridades SET activo = 0 WHERE id = ?', [id]);
  res.json({ message: 'Usuario desactivado' });
};
