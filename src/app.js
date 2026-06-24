import express from 'express'
import cors from 'cors';
import clientesRoutes from './routes/clientes.routes.js'
import ProductosRoutes from './routes/productos.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js';
import path from 'path'; 

const app = express();

// 1. CORS primero, antes de todo
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true  // ← "credentials" minúscula, "Credentials" no funciona
}
app.use(cors(corsOptions));

// 2. Parsear JSON
app.use(express.json());

// 3. Archivos estáticos
app.use('/upload', express.static(path.join("src", "upload")));

// 4. Rutas
app.use('/api', clientesRoutes);
app.use('/api', ProductosRoutes);
app.use('/api', pedidosRoutes);

// 5. Catch-all al final
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' })
});

export default app;