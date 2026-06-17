import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';
import {Router} from 'express'
import { verificarJWT } from '../middlewares/verificarToken.js';
import {getProductos, registrarProducto, editarProducto, eliminarProducto} from "../controladores/productosCtrl.js";
import upload from '../middlewares/upload.js';

const router=Router()
router.use(verificarJWT);
router.get("/productos", getProductos);
router.post("/productos", upload.single("foto"), registrarProducto);
router.put("/productos/:id", upload.single("foto"), editarProducto);
router.delete("/productos/:id", eliminarProducto);

export default router;