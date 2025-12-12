import { generarJWT } from "../Middlewares/validar_jwt.js"
import bcryptjs from "bcryptjs"
import Persona from "../Models/usuarios.js"

const registrar = async (req, res) => {
    const { usuario, email, contraseña } = req.body
    const salt = bcryptjs.genSaltSync();
    const contraseña_s = bcryptjs.hashSync(contraseña, salt)
    let registro = await Persona.find({ email: email })
    if (registro == 0) {
        let persona = new Persona({ usuario: usuario, email: email, contraseña: contraseña_s })
        await persona.save()
        res.json({ msg: persona })
    } else {
        res.json({ msg: "EL CORREO YA ESTA REGISTRADO" })
    }

}
const inicio = async (req, res) => {
    const { email, contraseña } = req.body
    let persona = await Persona.findOne({ email: email })

    const contraseña_v = bcryptjs.compareSync(contraseña, persona.contraseña)
    if (!contraseña_v) {
        res.status(400).json({ msg: "ERROR AL DIGITAR CONTRASEÑA O CORREO" })
    } else {
        const token = await generarJWT(persona.nombre);
        res.json({
            persona,
            token
        })
    }
}

const listarpersonas = async (req, res) => {
    let personas = await Persona.find({})
    res.json(personas)
}

export { registrar, inicio, listarpersonas }