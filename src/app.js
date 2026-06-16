import express, { response } from 'express'
//npm install cors
import cors from 'cors';
import clientesRoutes from './routes/clientes.routes.js'
const app=express();

const corsOptions={
    origin:'*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    Credentials:true
}

app.use(cors(corsOptions)); //habilitar los cors
app.use(express.json());//para que interprete los objetos json

//rutas
app.use('/api',clientesRoutes)
//app.use('/api',ProductosRoutes) ejemplo de rutas proximas
app.use((req,res,next)=>{
    res.status(400).json({
        message:'Endpoint not found'
    })
})
export default app;