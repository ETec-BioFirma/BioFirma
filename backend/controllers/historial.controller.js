const db = require('../db');

// 🔹 Obtener historial completo con filtros opcionales
exports.getHistorial = async (req, res) => {
  const { curso_id, division_id, alumno_id, fecha, tipo } = req.query;

  let baseQuery = 'SELECT * FROM registros WHERE 1 = 1';
  const params = [];

  if (curso_id) {
    baseQuery += ' AND alumno_id IN (SELECT id FROM alumnos WHERE curso_id = ?)';
    params.push(curso_id);
  }

  if (division_id) {
    baseQuery += ' AND alumno_id IN (SELECT id FROM alumnos WHERE division_id = ?)';
    params.push(division_id);
  }

  if (alumno_id) {
    baseQuery += ' AND alumno_id = ?';
    params.push(alumno_id);
  }

  if (fecha) {
    baseQuery += ' AND fecha = ?';
    params.push(fecha);
  }

  if (tipo) {
    baseQuery += ' AND accion = ?';
    params.push(tipo); // ingreso o egreso
  }

  baseQuery += ' ORDER BY fecha DESC, hora DESC';

  try {
    const [rows] = await db.query(baseQuery, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

// (Más adelante)
exports.exportarHistorial = async (req, res) => {
  // A implementar si querés exportar a CSV
  res.status(501).json({ message: 'Exportación aún no implementada' });
};
