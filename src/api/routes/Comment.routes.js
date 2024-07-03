const express = require("express");
const { isAuth, isAuthAdmin  } = require("../../middleware/auth.middleware");
const {
  createComment,
  deleteComment,
  createCommentGame,
  getAllComment,
} = require("../controllers/Comment.controller");

const CommentRoutes = express.Router();

CommentRoutes.post("/create/:idRecipient",[isAuth], createComment);
CommentRoutes.delete("/delete/:id", deleteComment);
CommentRoutes.post("/createCommentGame/:idRecipient",[isAuthAdmin], createCommentGame);
CommentRoutes.get("/getAllComment/", getAllComment);
module.exports = CommentRoutes;
