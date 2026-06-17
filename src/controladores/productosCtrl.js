import { conmysql } from "../db.js";

export const getProductos = async (req, res) => {
    try {
        const resultado = await conmysql.query("SELECT * FROM productos");
        res.json(resultado);
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

export const registrarProducto = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { codigo, nombre, stock, precio } = req.body;

        const imagen = req.file
            ? req.file.filename
            : null;

        const resultado = await conmysql.query(
            `
            INSERT INTO productos
            (
                prod_codigo,
                prod_nombre,
                prod_stock,
                prod_precio,
                prod_imagen
            )
            VALUES (?,?,?,?,?)
            `,
            [
                codigo,
                nombre,
                stock,
                precio,
                imagen
            ]
        );

        console.log("INSERT:", resultado);

        res.json({
            mensaje: "Producto registrado"
        });

    } catch (error) {
        console.log("ERROR:", error);

        res.status(500).json({
            error: error.message
        });
    }
};
export const editarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nombre, stock, precio } = req.body;
        const imagen = req.file
            ? req.file.filename
            : null;
        const resultado = await conmysql.query(
            `
            UPDATE productos
            SET
                prod_codigo = ?,
                prod_nombre = ?,
                prod_stock = ?,
                prod_precio = ?,
                prod_imagen = ?
            WHERE prod_id = ?
            `,
            [
                codigo,
                nombre,
                stock,
                precio,
                imagen,
                id
            ]
        );
        console.log("UPDATE:", resultado);
        res.json({
            mensaje: "Producto editado"
        });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            error: error.message
        });
    }
};
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await conmysql.query(
            `
            DELETE FROM productos
            WHERE prod_id = ?
            `,
            [id]
        );
        console.log("DELETE:", resultado);
        res.json({
            mensaje: "Producto eliminado"
        });
    }
    catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            error: error.message
        });
    }
};