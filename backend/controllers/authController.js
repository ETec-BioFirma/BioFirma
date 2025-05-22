const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ message: 'Faltan usuario o contraseña' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM autoridades WHERE usuario = ?', [usuario]);
    const user = rows[0];

    if (!user) {
      console.error(`❌ Usuario no encontrado: ${usuario}`);
      return res.status(401).json({ message: 'Usuario incorrecto' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      console.error(`❌ Contraseña incorrecta para ${usuario}`);
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol, usuario: user.usuario },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log(`✅ Login exitoso: ${usuario}`);
    return res.json({ token, rol: user.rol, nombre: user.nombre });

  } catch (error) {
    console.error('🛑 ERROR EN LOGIN:', error.stack || error.message || error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
