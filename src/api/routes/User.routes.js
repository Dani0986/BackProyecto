const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/file.middleware");
const {
  registerLargo,
  registerWithRedirect,
  sendCode,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  forgotPassword,
  sendPassword,
  exampleAuth,
  changePassword,
  updateUser,
  deleteUser,
  addFavGames,
  getAll,
  addFavFollowers,
  addFavCharacters,
  getByIds,
  deleteUserAdmin,
} = require("../controllers/User.controllers");

const UserRoutes = require("express").Router();

UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);
UserRoutes.post(
    "/direccionRegistro",
    upload.single("image"),
    registerWithRedirect
); // redirect con sendcode

UserRoutes.post("/resend", resendCode);
UserRoutes.post("/check", checkNewUser);

UserRoutes.post("/login", login);
UserRoutes.post("/autoLogin", autoLogin);

UserRoutes.patch("/forgotPassword", forgotPassword); // Redirect sendPassword


//! Rutas Autenticadas

//* middleware isAuth -> verifica el token */
//* isAuthAdmin -> verifica que tenemos token y somos rol = admin */

UserRoutes.get("/pruebas", [isAuthAdmin], exampleAuth);

UserRoutes.patch("/changePassword", [isAuth], changePassword);
UserRoutes.patch("/update/:id", [isAuth], upload.single("image"), updateUser);
UserRoutes.delete("/delete/:id", [isAuth], deleteUser);
UserRoutes.patch("/addLikeGames/:idGames", [isAuth], addFavGames);
// -- controladores usados por redirect

UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch("/forgot/sendPassword/:id", sendPassword);
UserRoutes.get("/getAll/", getAll);
UserRoutes.patch("/addFavFollowers/:idFollow", [isAuth], addFavFollowers);
UserRoutes.patch("/addFavCharacters/:idCharacter", [isAuth], addFavCharacters);
UserRoutes.get("/getById/:id", getByIds);
UserRoutes.delete("/deleteUserAdmin/:id", [isAuthAdmin], deleteUserAdmin);
module.exports = UserRoutes;