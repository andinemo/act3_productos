const express = require('express');
const app = express();

const {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('./productos');

app.use(express.json());
app.use(express.static('public'));

// Ruta inicial
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de productos funcionando' });
});

// Rutas REST
app.get('/productos', getProductos);
app.post('/productos', crearProducto);
app.put('/productos/:id', actualizarProducto);
app.delete('/productos/:id', eliminarProducto);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});