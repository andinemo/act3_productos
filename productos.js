const pool = require('./db');

// GET → listar productos
const getProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// POST → crear producto
const crearProducto = async (req, res) => {
  const { nombre, precio, categoria } = req.body;

  try {
    await pool.query(
      'INSERT INTO productos (nombre, precio, categoria) VALUES ($1, $2, $3)',
      [nombre, precio, categoria]
    );
    res.status(201).json({ mensaje: 'Producto creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// PUT → actualizar producto
const actualizarProducto = async (req, res) => {
  const id = req.params.id;
  const { nombre, precio, categoria } = req.body;

  try {
    await pool.query(
      'UPDATE productos SET nombre=$1, precio=$2, categoria=$3 WHERE id=$4',
      [nombre, precio, categoria, id]
    );
    res.status(200).json({ mensaje: 'Producto actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// DELETE → eliminar producto
const eliminarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query(
      'DELETE FROM productos WHERE id=$1',
      [id]
    );
    res.status(200).json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};