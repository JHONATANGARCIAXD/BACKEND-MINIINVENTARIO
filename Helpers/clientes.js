
import Cliente from "../Models/clientes.js";

const validarCorreoUnico = async (correo) => {
    const cliente = await Cliente.findOne({ correo });
    if (cliente) {
        throw new Error("EL CORREO YA ESTÁ REGISTRADO");
    }
};


const validarClientePorNombre = async (nombre, { req }) => {
    const cliente = await Cliente.findOne({ nombre });
    if (!cliente) {
        throw new Error("EL CLIENTE NO ESTÁ REGISTRADO");
    }
    req.cliente = cliente;
};


const validarClientePorCorreo = async (correo_buscar) => {
    const cliente = await Cliente.findOne({ correo: correo_buscar });
    if (!cliente) {
        throw new Error("EL CLIENTE NO ESTÁ REGISTRADO");
    }
};


export { validarCorreoUnico, validarClientePorNombre, validarClientePorCorreo };