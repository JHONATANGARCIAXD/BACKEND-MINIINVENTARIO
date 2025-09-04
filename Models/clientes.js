import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    nombre: { type: String },
    direccion: { type: String },
    telefono: { type: String },
    correo: { type: String }
})

export default mongoose.model("Cliente", ClienteSchema)