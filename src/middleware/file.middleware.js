//! ----------- IMPORTACIONES

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

//!------------- CREAMOS EL ALMACEN

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "BackEnd",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

//!------------ FUNCION QUE SUBE LAS IMAGENES

const upload = multer({ storage });

//!------------ FUNCIÓN DE BORRADO DE IMAGENES EN CLOUDINARY

const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image delete in cloudinary");
  });
};

//!--------- FUNCIÓN DE CONFIGURACIÓN DE CLOUDINARY CON VARIABLES DE ENTORNO

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};



module.exports = { upload, deleteImgCloudinary, configCloudinary };
