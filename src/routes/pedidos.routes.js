import { Router } from 'express';
import { verificarJWT } from '../middlewares/verificarToken.js';
import { registrarPedido, guardarPedido, getPedidos , getPedidoxId} from '../controladores/pedidosCtrl.js';

const router = Router();
router.use(verificarJWT);
router.post("/pedidos", registrarPedido);
router.post("/guardarPedido", guardarPedido);
router.get("/pedidos", getPedidos);
router.get("/pedidos/:id", getPedidoxId);
export default router;