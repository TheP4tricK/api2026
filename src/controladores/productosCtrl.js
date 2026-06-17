import { conmysql } from "../db.js";
import cloudinary from "../cloudinary.js";

export const getProductos = async (req, res) => {
  try {
    const resultado = await conmysql.query("SELECT * FROM productos");
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const registrarProducto = async (req, res) => {
  try {
    const { codigo, nombre, stock, precio } = req.body;
    let imagenUrl = null;

    if (req.file) {
      // Subir imagen a Cloudinary
      const resultado = await cloudinary.uploader.upload(req.file.path, {
        folder: 'productos'
      });
      imagenUrl = resultado.secure_url;
    }

    await conmysql.query(
      `INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_imagen)
       VALUES (?,?,?,?,?)`,
      [codigo, nombre, stock, precio, imagenUrl]
    );

    res.json({ mensaje: "Producto registrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, nombre, stock, precio } = req.body;

    // Obtener imagen actual
    const [rows] = await conmysql.query(
      "SELECT prod_imagen FROM productos WHERE prod_id = ?", [id]
    );
    let imagenUrl = rows[0]?.prod_imagen;

    if (req.file) {
      // Subir nueva imagen a Cloudinary
      const resultado = await cloudinary.uploader.upload(req.file.path, {
        folder: 'productos'
      });
      imagenUrl = resultado.secure_url;
    }

    await conmysql.query(
      `UPDATE productos SET prod_codigo=?, prod_nombre=?, prod_stock=?, prod_precio=?, prod_imagen=?
       WHERE prod_id=?`,
      [codigo, nombre, stock, precio, imagenUrl, id]
    );

    res.json({ mensaje: "Producto editado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await conmysql.query("DELETE FROM productos WHERE prod_id = ?", [id]);
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};