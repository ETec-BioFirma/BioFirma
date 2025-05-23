const db = require('../db');

exports.getDivisiones = async (req, res) => {
  const { cursoId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM divisiones WHERE curso_id = ?', [cursoId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener divisiones' });
  }
};

exports.getDivision = async (req, res) => {
  const { cursoId, divisionId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM divisiones WHERE id = ? AND curso_id = ?', [divisionId, cursoId]);
    if (rows.length === 0) return res.status(404).json({ error: 'División no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la división' });
  }
};

exports.createDivision = async (req, res) => {
  const { cursoId } = req.params;
  const { nombre } = req.body;
  try {
    const [result] = await db.query('INSERT INTO divisiones (nombre, curso_id) VALUES (?, ?)', [nombre, cursoId]);
    res.status(201).json({ id: result.insertId, nombre });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear división' });
  }
};

exports.updateDivision = async (req, res) => {
  const { cursoId, divisionId } = req.params;
  const { nombre } = req.body;
  try {
    await db.query('UPDATE divisiones SET nombre = ? WHERE id = ? AND curso_id = ?', [nombre, divisionId, cursoId]);
    res.json({ message: 'División actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar división' });
  }
};

exports.deleteDivision = async (req, res) => {
  const { cursoId, divisionId } = req.params;
  try {
    await db.query('DELETE FROM divisiones WHERE id = ? AND curso_id = ?', [divisionId, cursoId]);
    res.json({ message: 'División eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar división' });
  }
};
