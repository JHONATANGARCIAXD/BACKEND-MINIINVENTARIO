import express from "express"
import ia from "./Routers/ia.js"
import usarios from "./Routers/usuarios.js"
import productos from "./Routers/productos.js"
import clientes from "./Routers/clientes.js"
import mongoose from "mongoose"
import ventas from "./Routers/ventas.js"
import cors from "cors";
import categorias from "./Routers/categorias.js"



const app = express()

app.use(cors());
app.use(cors({
    origin: "http://localhost:5173", // tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use(express.json())
app.use(express.static("public"))

app.use("/ia", ia)
app.use("/users", usarios)
app.use("/products", productos)
app.use("/clients", clientes)
app.use("/ventas", ventas)
app.use("/categorias", categorias)

mongoose.connect(process.env.MONGO_CNX)
    .then(console.log(`BASE DE DATOS CONCETADA`))

app.listen(5000, () => {
    console.log(`SERVIDOR ESCUCHANDO CORRECTAMENTE`);
})
