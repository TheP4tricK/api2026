import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';
import {Router} from 'express'
import { verificarJWT } from '../middlewares/verificarToken.js';
import {deleteClientes, getClientes,getClientesxid, patchClientes, postInsertarClientes, putClientes} from '../controladores/clientesCtrl.js';

import jwt from 'jsonwebtoken';
const router=Router()
//armar nuestras rutas


const SECRET = 'clave123';
router.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const [rows] = await conmysql.query(
            'SELECT * FROM usuarios WHERE usr_usuario = ?',
            [usuario]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
        const user = rows[0];
        const valida = await bcrypt.compare(
            password,
            user.usr_clave
        );
        if (!valida) {
            return res.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });
        }
        const token = jwt.sign(
            {
                id: user.usr_id,
                usuario: user.usr_usuario
            },
            SECRET,
            {
                expiresIn: '1h'
            }
        );
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error del servidor'
        });
    }
});

router.use(verificarJWT);

router.get('/clientes', getClientes);

router.get('/clientes/:id', getClientesxid);

router.post('/clientes', postInsertarClientes);

router.put('/clientes/:id', putClientes);

router.patch('/clientes/:id', patchClientes);

router.delete('/clientes/:id', deleteClientes);

export default router





