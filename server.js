import express from 'express';
import obtenerPrecioCafe from './index.js';

const app = express();
const PORT = 3000;

app.get('/precio-cafe', async (req, res) => {
  try {
    const precios = await obtenerPrecioCafe();
    res.json({ precios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});