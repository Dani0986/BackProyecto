//!--------- TRAEMOS MONGOOSE
const mongoose = require("mongoose");

//!--------- nos traemos de mongoose los squemas de datos
const Schema = mongoose.Schema;


//!---------> CREAMOS EL MODELO DE DATOS
//* Tenemos que poner a cada clave el tipo de dato
//* Definimos otras propiedades que limitan la información que se puede incluir esa clase --->
//* si es obligatoria , longitud maxima, minima.....

const CharacterSchema = new Schema(
  {
    name: { type: String, required: false, unique: false },
    gender: {
      type: String,
      enum: ["hombre", "mujer", "otro"],
      required: false,
    },
    image: { type: String, required: false },
    // Array de object id que hace referencia a mi MODELO movie -->
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    year: {type: String, required: false},
   /* gamesFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game"}],
    characterFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character"}],*/

  },
  // Para que salga la fecha de creacion
  {
    timestamps: true,
  }
);

//!--- con la definición de datos y su esquema vamos a definir nuestro MODELO CHARACTER

const Character = mongoose.model("Character", CharacterSchema);

//!------ exportamos el modulo
module.exports = Character;
