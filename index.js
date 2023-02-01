import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import comentariosRoutes from './routes/comentariosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/comentarios', comentariosRoutes);
app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})