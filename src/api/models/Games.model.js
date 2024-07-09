
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    year: { type: Number, require: true },
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    image: { type: String, required: false },
    score: { type: String, required: false},
    character: {type: String, required: false},
    price: {type: String, required: false },
   /* gamesFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game"}],
    characterFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character"}],*/
  },
  
  
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;