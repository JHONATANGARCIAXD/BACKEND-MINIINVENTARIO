import Cliente from "../Models/clientes.js";

const CreateClients = async (req, res) => {
    try {
        const { nombre, direccion, telefono, correo } = req.body
        let clientenuevo = new Cliente({ nombre: nombre, direccion: direccion, telefono: telefono, correo: correo })
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
        res.json({msg: "ERROR AL MOSTRAR CLIENTES"})
    }
}

const SpecificClient = async (req, res) => {
    try {
        res.json({ msg: req.cliente })
    }
    catch {
        res.json({ msg: "ERROR AL BUSCAR" })
    }
}

const ModifyClient = async (req, res) => {
    try {
        const { correo_buscar } = req.params
        const { nombre, direccion, telefono, correo } = req.body
        await Cliente.findOneAndUpdate({ correo: correo_buscar }, { nombre: nombre, direccion: direccion, telefono: telefono, correo: correo })
        res.json({ msg: "DATOS DEL CLIENTE ACTUALIZADOS" })
    }
    catch {
        res.json({ msg: "ERROR AL ACTUALIZAR LOS DATOS" })
    }
}

const DeleteClient = async (req, res) => {
    try {
        const { correo_buscar } = req.params
        await Cliente.findOneAndDelete({ correo: correo_buscar })
        res.json({ msg: "CLIENTE ELIMINADO CON EXITO" })
    }
    catch {
        res.json({ msg: "ERROR AL ELIMINAR" })
    }
}


export { CreateClients, ShowClients, SpecificClient, ModifyClient, DeleteClient }