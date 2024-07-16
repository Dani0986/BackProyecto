//! tramemos mongoose

const mongoose = require("mongoose");

//! importamos diferentes librerias

const bcrypt = require("bcrypt"); // sirve para encriptar
const validator = require("validator"); // nos valida la info

//! schema de datos
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [validator.isEmail, "Email no válido"],
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate: [validator.isStrongPassword],
        },
        gender: {
            type: String,
            enum: ["Hombre", "Mujer", "Otro"],
            required: true,
        },
        rol: {
            type: String,
            enum: ["admin", "user", "superAdmin"],
            default: "user",
        },
        confirmationCode: {
            type: Number,
            required: true,
        },
        check: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
        },
        gamesFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
        characterFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        postedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        commentsByOther: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        FechaNacimiento: {
            type: Date,
            required: true,
            validate: {
                validator: function(v) {
                    return !isNaN(Date.parse(v));}
                
            }
        }
    },
    {
        timestamps: true,
    }
);


//! creamos el modelo en el base al Schema

const User = mongoose.model("User", UserSchema);

//! exportamos para poder usarlo

module.exports = User;