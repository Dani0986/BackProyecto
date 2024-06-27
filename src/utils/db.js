//! Requerimos Dotenv y Mongoose

const dotenv = require("dotenv");

const mongoose = require("mongoose");

//usamos dotenv
dotenv.config();

//! Nos traemos Mongo_Uri de .ENV

const MONGO_URI = process.env.MONGO_URI;

//! Creamos funcion que conecta con nuestra Base de Datos

const connect = async () => {
    // try: intentar hacer algo , catch si hay un error lo capturas (catch = capturar)
 try {
    // conectamos con nuestra base de datos

    const db = await mongoose.connect(MONGO_URI);

    // Hacemos destructuring de nombre y host de nuestra base de datos

    const { name, host } = db.connection;

    console.log(
        `Conectamos a la DB con el nombre: ${name} en el host: ${host}`
    );
 } catch (error) {
    console.log("Hay un error en la conexion ❌, ", error)
 }
};

module.exports = { connect };