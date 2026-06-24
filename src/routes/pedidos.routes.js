import { Router } from 'express';
import { verificarJWT } from '../middlewares/verificarToken.js';
import { registrarPedido } from '../controladores/pedidosCtrl.js';

const router = Router();
router.use(verificarJWT);
router.post("/pedidos", registrarPedido);

export default router;