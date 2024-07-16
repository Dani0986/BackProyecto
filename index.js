//! -------------------- importar y configurar dotenv

const express = require("express");
const dotenv = require("dotenv");
const multer = require('multer');
const bodyParser = require('body-parser');
dotenv.config();

//! ------------------- conexión base de datos y ejecucion

const { connect } = require("./src/utils/db");

connect();

//! -------------------- configurar cloudinary
const { configCloudinary } = require("./src/middleware/file.middleware");
configCloudinary();
//! -------------------- creamos el servidor

const app = express();

//! -------------------- damos las cors al server

const cors = require("cors");

app.use(cors());

//! -------------------- limitaciones

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));
//--

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ruta/donde/guardar/las/imagenes'); // Define la ruta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define el nombre del archivo
  },
});
const upload = multer({ storage: storage }).single('Imagen');

//! -------------------- RUTAS ------------------

const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/user", UserRoutes);

const CharacterRoutes = require("./src/api/routes/Character.routes");
app.use("/api/v1/character", CharacterRoutes);

const GamesRoutes = require("./src/api/routes/Games.routes");
app.use("/api/v1/Games", GamesRoutes);

const CommentRoutes = require("./src/api/routes/Comment.routes");
app.use("/api/v1/comment", CommentRoutes);

//! ----------------- generamos ERROR cuando no se encuentre - coincida la ruta

app.use("*", (req, res, next) => {
 console.log(req)
  const error =new Error("Ruta no encontrada");
  error.status = 404;
  return next(error);
});

//! ----------------- capturamos el error cuando el server crashea

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Error inesperado");
});

app.disable("x-powered-by");

//! ------------- traemos variable de entorno

const PORT = process.env.PORT;

//! ---------------- escuchamos en el puerto el servidor web

app.listen(PORT, () =>
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
);


