const db = require('../db');

// Obtener logs con filtros opcionales
exports.getLogs = async (req, res) => {
  const { origen, accion, usuario_id, fecha } = req.query;

  let query = 'SELECT * FROM log_eventos WHERE 1 = 1';
  const params = [];

  if (origen) {
    query += ' AND origen = ?';
    params.push(origen);
  }
  if (accion) {
    query += ' AND accion = ?';
    params.push(accion);
  }
  if (usuario_id) {
    query += ' AND usuario_afectado = ?';
    params.push(usuario_id);
  }
  if (fecha) {
    query += ' AND fecha = ?';
    params.push(fecha);
  }

  query += ' ORDER BY fecha DESC, hora DESC';

  try {
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener logs:', err);
    res.status(500).json({ error: 'Error al obtener logs' });
  }
};

// Exportar logs (futuro)
exports.exportarLogs = (req, res) => {
  res.status(501).json({ message: 'Exportar logs no implementado todavía' });
};
