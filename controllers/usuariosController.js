import Usuario from "../models/Usuario.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req, res) => {
    const { nombre, email } = req.body;
    
    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        emailRegistro({
            email,
            nombre,
            token: usuarioGuardado.token
        });

        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Usuario.findOne({token});

    if(!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message, error: true});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: 'Usuario Confirmado Correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const olvide = async (req, res) => {
    const { email } = req.body;

    const existeUsuario = await Usuario.findOne({email});
    if(!existeUsuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        existeUsuario.token = generarId();
        await existeUsuario.save();
        
        // Enviar Email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeUsuario.nombre,
            token: existeUsuario.token
        })

        res.json({msg: 'Hemos enviado un mensaje con las instrucciones'});
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({token});

    if(tokenValido) {
         // El token es válido el usuario existe
         res.json({msg: 'Token válido y el usuario existe'});
    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message, error: true});
    }

}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({token});
    if(!usuario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try {
        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        res.json({msg: 'Password Modificado Correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    if(!usuario.confirmado) {
        const error = new Error('Confirma tu cuenta');
        return res.status(400).json({msg: error.message});
    }

    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        })
    } else {
        const error = new Error('El Password es Incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

export {
    registrar,
    olvide,
    confirmar,
    comprobarToken,
    nuevoPassword,
    login
}