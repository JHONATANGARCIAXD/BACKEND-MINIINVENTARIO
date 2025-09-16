import Cliente from "../Models/clientes.js";

const CreateClients = async (req, res) => {
    try {
        const { identificacion, nombre, direccion, telefono, correo } = req.body
        let clientenuevo = new Cliente({ identificacion: identificacion, nombre: nombre, direccion: direccion, telefono: telefono, correo: correo })
        await clientenuevo.save()
        res.json({ msg: "CLIENTE CREADO Y GUARDADO CORRECTAMENTE" })
    }
    catch {
        res.json({ msg: "ERROR AL GUARDAR" })
    }
}

const ShowClients = async (req, res) => {
    try {
        const clientes = await Cliente.find({})
        res.json({ msg: clientes })
    }
    catch {
        res.json({ msg: "ERROR AL MOSTRAR CLIENTES" })
    }
}

const SpecificClient = async (req, res) => {
    try {
        const { id } = req.params
        const cliente = await Cliente.findOne({ identificacion: id })
        res.json({ msg: cliente })
    }
    catch {
        res.json({ msg: "ERROR AL BUSCAR" })
    }
}

const ModifyClient = async (req, res) => {
    try {
        const { identificacion_buscar } = req.params
        const { identificacion, nombre, direccion, telefono, correo } = req.body
        await Cliente.findOneAndUpdate({ identificacion: identificacion_buscar }, { identificacion: identificacion, nombre: nombre, direccion: direccion, telefono: telefono, correo: correo })
        res.json({ msg: "DATOS DEL CLIENTE ACTUALIZADOS" })
    }
    catch {
        res.json({ msg: "ERROR AL ACTUALIZAR LOS DATOS" })
    }
}


const Modifystate = async (req, res) => {
    try {
        const { identificacion_buscar } = req.params
        const { estado } = req.body
        await Cliente.findOneAndUpdate({ identificacion: identificacion_buscar }, { estado: estado })
        res.json({ msg: "ESTADO ACTUALIZADO" })
    }
    catch {
        res.json({ msg: "ERROR AL ACTUALIZAR EL ESTADO" })
    }
}


export { CreateClients, ShowClients, SpecificClient, ModifyClient, Modifystate }