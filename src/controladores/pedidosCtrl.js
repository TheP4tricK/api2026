import { conmysql } from "../db.js";

export const registrarPedido = async (req, res) => {
  try {
    const { cli_id, usr_id, detalles } = req.body;

    const [pedido] = await conmysql.query(
      `INSERT INTO pedidos (cli_id, usr_id, ped_estado) VALUES (?, ?, 'pendiente')`,
      [cli_id, usr_id]
    );

    const ped_id = pedido.insertId;

    for (const item of detalles) {
      await conmysql.query(
        `INSERT INTO pedidos_detalle (ped_id, prod_id, det_cantidad, det_precio) VALUES (?,?,?,?)`,
        [ped_id, item.prod_id, item.det_cantidad, item.det_precio]
      );
    }

    res.json({ mensaje: "Pedido registrado", ped_id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};