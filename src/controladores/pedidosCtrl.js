import { conmysql } from "../db.js";

export const registrarPedido = async (req, res) => {
  try {
    const { cli_id, usr_id, detalles } = req.body;
    console.log('BODY RECIBIDO:', req.body); // agrega esto

    const [pedido] = await conmysql.query(
        `INSERT INTO pedidos (cli_id, usr_id, ped_estado) VALUES (?, ?, 1)`,
        [cli_id, usr_id]
        );} catch (error) {
        console.log(error);
    res.status(500).json({ error: error.message });
  }

  
};