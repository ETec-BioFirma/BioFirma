const db = require('../db');

// 🔹 Obtener TODOS los alumnos de un curso
exports.getAlumnosPorCurso = async (req, res) => {
  const { cursoId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM alumnos WHERE curso_id = ?', [cursoId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener alumnos del curso' });
  }
};

// 🔹 Obtener alumnos de una división
exports.getAlumnosPorDivision = async (req, res) => {
  const { cursoId, divisionId } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM alumnos WHERE curso_id = ? AND division_id = ?',
      [cursoId, divisionId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener alumnos de la división' });
  }
};

// 🔹 Obtener un alumno específico
exports.getAlumno = async (req, res) => {
  const { cursoId, divisionId, id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM alumnos WHERE id = ? AND curso_id = ? AND division_id = ?',
      [id, cursoId, divisionId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el alumno' });
  }
};

// 🔹 Crear alumno
exports.createAlumno = async (req, res) => {
  const { cursoId, divisionId } = req.params;
  const { nombre, apellido, dni, template, huella_ok } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO alumnos (nombre, apellido, dni, curso_id, division_id, template, huella_ok) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, dni, cursoId, divisionId, template || '', huella_ok || false]
    );
    res.status(201).json({ id: result.insertId, nombre, apellido });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear alumno' });
  }
};

// 🔹 Editar alumno
exports.updateAlumno = async (req, res) => {
  const { cursoId, divisionId, id } = req.params;
  const { nombre, apellido, dni, template, huella_ok } = req.body;

  try {
    await db.query(
      'UPDATE alumnos SET nombre = ?, apellido = ?, dni = ?, template = ?, huella_ok = ? WHERE id = ? AND curso_id = ? AND division_id = ?',
      [nombre, apellido, dni, template, huella_ok, id, cursoId, divisionId]
    );
    res.json({ message: 'Alumno actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar alumno' });
  }
};

// 🔹 Eliminar alumno
exports.deleteAlumno = async (req, res) => {
  const { cursoId, divisionId, id } = req.params;
  try {
    await db.query(
      'DELETE FROM alumnos WHERE id = ? AND curso_id = ? AND division_id = ?',
      [id, cursoId, divisionId]
    );
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar alumno' });
  }
};
