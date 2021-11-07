const Router = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const { Post_edit_service } = require("../service/post_actions-service");
const postrouter = Router();

postrouter.post(
  "/userData/userPost_action/like",
  authMiddleware,
  Post_edit_service.likeUserPost,
);
postrouter.post(
  "/userData/userPost_action/comment",
  authMiddleware,
  Post_edit_service.commentUserPost,
);


module.exports = postrouter;
