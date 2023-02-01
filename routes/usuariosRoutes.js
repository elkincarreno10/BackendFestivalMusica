import express from 'express';
import { 
    registrar,
    olvide,
    confirmar,
    comprobarToken,
    nuevoPassword,
    login
} from '../controllers/usuariosController.js';


const router = express.Router();

router.post('/', login);
router.post('/registrar', registrar);
router.post('/olvide-password', olvide);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);
router.get('/confirmar/:token', confirmar);


export default router;