import mongoose from "mongoose"

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
    },
    cantidad: { type: Number, default: 0 },
    precio: { type: Number, default: 0 },
    descripcion: { type: String },
    referencia: { type: String },
    estado: { type: Number, default: 0 }
})

export default mongoose.model("Producto", ProductoSchema)