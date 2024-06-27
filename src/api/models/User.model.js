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
        trim: true, // quitar espacios
        unique: true,
        validate: [validator.isEmail, "Email no valido"],
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
        validate: [validator.isStrongPassword], // 
    //* { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
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
    gamesFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game"}],
    characterFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character"}],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // los que sigen al user
    followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}], // seguidos por el user
    postedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    commentsByOther: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],

}, 
{
    timestamps: true,
});

//! hacemos un preguardado donde se va a encriptar la contraseña

UserSchema.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next("Error encriptando la contraseña", error);
    }
});

//! creamos el modelo en el base al Schema

const User = mongoose.model("User", UserSchema);

//! exportamos para poder usarlo

module.exports = User;