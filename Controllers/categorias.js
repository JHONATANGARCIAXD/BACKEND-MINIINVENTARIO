import categorias from "../Models/categorias.js";

const CreateCategoria = async (req, res) => {
    try {
        const { id, nombre, descripcion } = req.body
        let categoria = new categorias({ id: id, nombre: nombre, descripcion: descripcion })
        await categoria.save()
        res.json({ msg: "CATEGORIA CREADA" })
    }
    catch {
        res.json({ msg: "ERROR AL GUARDAR" })
    }
}

const ShowCategoria = async (req, res) => {
    try {
        const categories = await categorias.find({})
        res.json({ msg: categories })
    } catch {
        res.json({ msg: "ERROR AL TRAER" })
    }
}


const UpdateCategoria = async (req, res) => {
    try {
        const id_antoguo = req.params.id
        const { id, nombre, descripcion, estado } = req.body
        await categorias.findOneAndUpdate({ id: id_antoguo }, { id: id, nombre: nombre, descripcion: descripcion, estado: estado })
        res.json({ msg: "DATOS DE LA CATEGORIA ACTUALIZADOS" })
    }

    catch {
        res.status(400).json({ msg: "ERROR AL ACTUALIZAR" })
    }
}



const UpdateState = async (req, res) => {
    try {
        const { id } = req.params
        const { estado } = req.body

        await categorias.findOneAndUpdate({ id: id }, { estado: estado })
        res.json({ msg: "ESTADO ACTUALIZADO" })
    }

    catch {
        res.status(400).json({ msg: "ESTADO ACTUALIZADO" })
    }
}
export { CreateCategoria, ShowCategoria, UpdateCategoria, UpdateState }