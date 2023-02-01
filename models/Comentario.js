import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    comentario: {
        type: String,
        required: true,
        trim: true
    }
})

const Comentario = mongoose.model('Comentario', comentarioSchema);
export default Comentario;