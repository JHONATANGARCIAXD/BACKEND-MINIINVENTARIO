import categorias from "../Models/categorias.js";

const CreateCategoria = async (req, res) => {
    try {
        const { id, nombre, descripcion } = req.body
        let categoria = new categorias({ id: id, nombre: nombre, descripcion: descripcion })
        await categoria.save()
        res.json({ msg: "CATEGORIA CREADA" })
    }
    catch {
        res.status(400).json({ msg: "ERROR AL GUARDAR CATEGORIA" })
    }
}

const ShowCategoria = async (req, res) => {
    try {
        const categories = await categorias.find({})
        res.json({ msg: categories })
    } catch {
        res.status(400).json({ msg: "ERROR AL TRAER CATEGORIAS" })
    }
}


const ModifyCategoria = async (req, res) => {
    try {
        const id_antiguo = req.params.id
        const { id, nombre, descripcion } = req.body
        await categorias.findOneAndUpdate({ id: id_antiguo }, { id: id, nombre: nombre, descripcion: descripcion })
        res.json({ msg: "DATOS DE LA CATEGORIA ACTUALIZADOS" })
    }
    catch {
        res.status(400).json({ msg: "ERROR AL ACTUALIZAR LOS DATOS" })
    }
}

const ModifyState = async (req, res) => { 
    try {
        const { id } = req.params
        const { estado } = req.body

        console.log(estado);

        await categorias.findOneAndUpdate({ id: id }, { estado: estado })
        console.log(id);
        res.json({ msg: "ESTADO ACTUALIZADO" })
    }

    catch {
        res.status(400).json({ msg: "ERROR AL ACTUALIZAR EL ESTADO" })
    }
}


export { CreateCategoria, ShowCategoria, ModifyCategoria, ModifyState }