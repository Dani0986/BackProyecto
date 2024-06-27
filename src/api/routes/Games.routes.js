const {
    createGame,
    toggleCharacters,
    deleteGame,
    getAll,
    getById,
    getByName,
    updateGame,
    createGameAuth,
    addFavGames,
    update,

  } = require("../controllers/games.controller");
  
  const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
  const { upload } = require("../../middleware/file.middleware")
  
  const express = require("express");
  const gamesRoutes = express.Router();
  
gamesRoutes.post("/create/", upload.single("image"), createGame);
gamesRoutes.patch("/toggle/:id", toggleCharacters);
gamesRoutes.get("/getAll/", getAll);
gamesRoutes.get("/getById/:id", getById);
gamesRoutes.get("/getByName/:name", getByName);  
gamesRoutes.delete("/delete/:id", deleteGame);
gamesRoutes.patch("/update/:id", [isAuth], upload.single("image"), updateGame);
gamesRoutes.post("/createGameAuth/", upload.single("image"), createGameAuth);
gamesRoutes.patch("/likes/:idGame", [isAuth], addFavGames);
gamesRoutes.patch("/update/:id", upload.single("image"), update);


module.exports = gamesRoutes;
  