require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/login', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en puerto ${PORT}`);
});
