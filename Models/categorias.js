import mongoose from "mongoose";

const categoriasSchema = new mongoose.Schema({
    id: {type: String},
    nombre: { type: String },
    descripcion: { type: String },
    estado: { type: Number, default: 0 }
})

export default mongoose.model("Categoria", categoriasSchema)
