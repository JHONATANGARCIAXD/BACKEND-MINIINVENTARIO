import Usuarios from "../Models/usuarios.js";

const validarCorreoUnicoUsuario = async (correo, {req}) => {
    const usuario = await Usuarios.findOne({ correo });
    if (usuario) {
        throw new Error("EL CORREO YA ESTÁ REGISTRADO");
    }
};


const validarUsuarioPorCorreo = async (correo_buscar) => {
    const usuario = await Usuarios.findOne({ email: correo_buscar });
    if (!usuario) {
        throw new Error("EL USUARIO NO ESTÁ REGISTRADO");
    }
};


export { validarCorreoUnicoUsuario,  validarUsuarioPorCorreo}