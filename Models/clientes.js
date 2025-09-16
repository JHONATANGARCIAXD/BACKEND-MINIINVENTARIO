import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    identificacion: { type: String },
    nombre: { type: String },
    direccion: { type: String },
    telefono: { type: String },
    correo: { type: String },
    estado: { type: Number, default: 0 }
})

export default mongoose.model("Cliente", ClienteSchema)