import jwt from 'jsonwebtoken';
import Persona from "../Models/usuarios.js"


const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "24h"
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}


const validarJWT = async (req, res, next) => {
    const { token } = req.headers 
    if (!token) {
        res.json("NO HAY TOKEN")
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let usuario = await Persona.find({ uid })

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido "
            })
        }
        req.usuario = usuario
        next();
    }
    catch (error) { 
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}




export { generarJWT, validarJWT }
