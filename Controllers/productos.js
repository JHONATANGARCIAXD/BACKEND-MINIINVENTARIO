import productos from "../Models/productos.js"
import Producto from "../Models/productos.js"

const CrateProduct = async (req, res) => {
    try {
        const { nombre, categoria, cantidad, precio, descripcion, referencia } = req.body
        let producto = new Producto({ nombre: nombre, categoria: categoria, cantidad: cantidad, precio: precio, descripcion: descripcion, referencia: referencia })
        await producto.save()
        res.json({ msg: "PRODUCTO CREADO" })
    }
    catch {
        res.status(400).json({ msg: "ERROR AL GUARDAR" })
    }
}

const ShowProducts = async (req, res) => {
    try {
        const productos = await Producto.find({}).populate("categoria", "nombre")
        res.json({ msg: productos })
    } catch {
        res.status(400).json({ msg: "ERROR AL TRAER" })
    }
}

const SpecificProduct = async (req, res) => {
    try {
        const {referencia_buscar } = req.params
        console.log(referencia_buscar);
        const producto  = await productos.findOne({referencia: referencia_buscar}).populate("categoria", "nombre")
        console.log(producto);
        res.json({ msg: producto })
    }
    catch {
        res.status(400).json({ msg: "ERROR AL BUSCAR EL PRODUCTO" })
    }
}

const ModifyProduct = async (req, res) => {
    try {
        const { referencia_buscar } = req.params
        const { nombre, categoria, cantidad, precio, descripcion, referencia, estado } = req.body
        await Producto.findOneAndUpdate({ referencia: referencia_buscar }, { nombre: nombre, categoria: categoria, cantidad: cantidad, precio: precio, descripcion: descripcion, referencia: referencia, estado: estado })
        res.json({ msg: "DATOS DEL PRODUCTO ACTUALIZADOS" })

    }
    catch {
        res.status(400).json({ msg: "ERROR AL ACTUALIZAR LOS DATOS " })
    }

}

const Modifystate = async (req, res) => {
    try {
        const { referencia_buscar } = req.params
        const { estado } = req.body
        await Producto.findOneAndUpdate({ referencia: referencia_buscar }, { estado: estado })


        res.json({ msg: "ESTADO ACTUALIZADO" })
    }

    catch {
        res.status(400).status(400).json({ msg: "ERROR AL ACTIVAR / DESACTIVAR" })
    }
}

const DeleteProduct = async (req, res) => {
    try {
        const { referencia_buscar } = req.params
        await Producto.findOneAndDelete({ referencia: referencia_buscar })
        res.json({ msg: "PRODUCTO ELIMINADO CORRECTAMENTE" })
    }
    catch {
        res.status(400).json({ msg: "ERROR AL ELIMINAR EL PRODUCTO" })
    }
}


export { CrateProduct, ShowProducts, SpecificProduct, ModifyProduct, Modifystate, DeleteProduct }