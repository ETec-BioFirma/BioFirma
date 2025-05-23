const db = require('../db');

exports.getCursos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cursos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
};

exports.getCurso = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM cursos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
};

exports.createCurso = async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await db.query('INSERT INTO cursos (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id: result.insertId, nombre });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el curso' });
  }
};

exports.updateCurso = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await db.query('UPDATE cursos SET nombre = ? WHERE id = ?', [nombre, id]);
    res.json({ message: 'Curso actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
};

exports.deleteCurso = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM cursos WHERE id = ?', [id]);
    res.json({ message: 'Curso eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
};
