import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'Festival - Música',
        to: email,
        subject: 'Comprueba tu cuenta en Festival - Música',
        text: 'Comprueba tu cuenta en Festival - Música',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en Festival - Música.</p>
            <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });
}

export default emailRegistro;