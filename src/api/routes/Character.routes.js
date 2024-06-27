//!-------- nos traemos UPLOAD (función de multer para subida de ficheros)
const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/file.middleware");

//!-------- IMPORTAMOS LOS CONTROLADORES

const {
  create,
  getAll,
  getById,
  getByName,
  update,
  deleteCharacter,
  addFavCharacter,
  addFavGames,
  updateGame,
  createAuth,
  toggleGame,
} = require("../controllers/Character.controller");

//!--------- CREAMOS UN ROUTER ESPECIFICO PARA CHARACTER --- al llamarlo disponemos de todas las rutas ---> será llamado en el index

const express = require("express");

const CharacterRoutes = express.Router();

//!--------- AÑADIMOS NUESTRAS RUTAS

// En medio de la ruta y del controlador (funión create)
// Se encuentra el middleware de subida de ficheros a cloudinary
// multer tiene el metodo SINGLE para subir una sola imagen
//* por el req.file va a recibir una clave que se llama image y con esa
//  * clave quiero que el midddleware upload me lo suba a cloudinary para este disponible cuando entre
//  * al controlador mediante la req.file.path ===> esto es igual a la URL de la imagen en cloudinary

CharacterRoutes.post("/create/", upload.single("image"), create);
CharacterRoutes.get("/getAll/", getAll);
CharacterRoutes.get("/getById/:id", getById);
CharacterRoutes.get("/getByName/:name", getByName);
CharacterRoutes.patch("/update/:id", upload.single("image"), update);
CharacterRoutes.delete("/delete/:id", deleteCharacter);
CharacterRoutes.patch("/Like/:idCharacter", [isAuth], addFavCharacter);
CharacterRoutes.patch("/addFavGames/:idgame", [isAuth], addFavGames);
CharacterRoutes.patch("/updateGame/:id", [isAuth], updateGame);
CharacterRoutes.post("/createAuth", upload.single("image"), [isAuth], createAuth);
CharacterRoutes.patch("/toggleGame/:id", toggleGame);
module.exports = CharacterRoutes;
