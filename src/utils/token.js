

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//! generamos un token

const generateToken = (id, email) => {
    //si no tenemos id o email mandamos error

    if(!id || !email) {
        throw new Error("Falta el email o Id");
    }

    // si lo recibido es correcto registramos la peticion
    // utilaizamos el mtodo sign de jwt
    //param > palabra secreta

    return jwt.sign({id, email}, process.env.JWT_SECRET, { expiresIn: "1d"});
};

//! verificamos el token
//! decodificamos para saber si es valido y obtener la info con lo que se a creado el email

const verifyToken = (token) => {
    // verificar si traemos el token por param, para lnazar error si no es asi
    if (!token) {
        throw new Error("Sin token");
    }

    return jwt.verify(token, process.env.JWT_SECRET);
};

//! exportamos

module.exports = {
    generateToken,
    verifyToken,
};