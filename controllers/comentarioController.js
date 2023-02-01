import Comentario from '../models/Comentario.js';


const obtenerComentarios = async (req, res) => {

    try {
        const comentarios = await Comentario.find();
        return res.json(comentarios);
    } catch (error) {
        return res.status(400),sjon({msg: error.message})
    }
}

const agregarComentario = async (req, res) => {
    const { nombre, ciudad, comentario } = req.body;

    if([nombre, ciudad, comentario].includes('')) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400),sjon({msg: error.message});
    }

    try {
        const comentario = new Comentario(req.body);
        const comentarioGuardado = await comentario.save();

        return res.json({msg: 'Comentario Guardado Correctamente'});
    } catch (error) {
        console.log(error);
    }
}

export {
    obtenerComentarios,
    agregarComentario
}