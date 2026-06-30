import { Router } from 'express';
import { verificarJWT } from '../middlewares/verificarToken.js';
import { registrarPedido, guardarPedido } from '../controladores/pedidosCtrl.js';

const router = Router();
router.use(verificarJWT);
router.post("/pedidos", registrarPedido);
router.post("/guardarPedido", guardarPedido);

export default router;