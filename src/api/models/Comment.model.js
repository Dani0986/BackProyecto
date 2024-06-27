//!---------- requerimos mongoose

const mongoose = require("mongoose");

//! traemos el Schema de mongoose
const Schema = mongoose.Schema;

//! Creamos esquema de datos

// todo---------------------- EL COMENTARIO SOLO PUEDE IR DIRIGIDO A UN REGISTRO YA SEA CHARACTER, MOVIE O USER
const CommentSchema = new Schema(
  {
    // User que crea el comentario
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    // Array de ids de user que les gusta el comentario
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    
    // Id del character al que va dirigido el comentario
    recipientCharacter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
    // Id del game al que va dirigido el comentario
    recipientGame: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    // Id del user al que va dirigido el comentario
    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ! ---------------- creamos el modelo con la definición de datos y su esquema
const Comment = mongoose.model("Comment", CommentSchema);

//! ----------- exportamos el modelo para que sea usado por los controllers
module.exports = Comment;
