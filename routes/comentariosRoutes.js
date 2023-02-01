import express from 'express';

import {
    obtenerComentarios,
    agregarComentario
} from '../controllers/comentarioController.js';

const router = express.Router();

router.get('/', obtenerComentarios);
router.post('/agregar-comentario', agregarComentario);



export default router;