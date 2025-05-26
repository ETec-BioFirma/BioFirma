require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const cursosRoutes = require('./routes/cursos.routes');
const divisionesRoutes = require('./routes/divisiones.routes');
const alumnosRoutes = require('./routes/alumnos.routes');
const historialRoutes = require('./routes/historial.routes');
const adminRoutes = require('./routes/admin.routes');
const logsRoutes = require('./routes/logs.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/login', authRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/cursos/:cursoId/divisiones', divisionesRoutes);
app.use('/api/cursos/:cursoId/divisiones/:divisionId/alumnos', alumnosRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/logs', logsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en puerto ${PORT}`);
});
