const Router = require("express");
const userConroller = require("../controllers/user-conroller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const authrouter = Router();

authrouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({
    min: 3,
    max: 32,
  }),
  userConroller.registration,
);

authrouter.post("/login", userConroller.login);
authrouter.get("/logout", userConroller.logout);
authrouter.get("/activate/:link", userConroller.activate);
authrouter.get("/refresh", userConroller.refresh);
authrouter.get("/getusers", authMiddleware, userConroller.getUsers);

module.exports = authrouter;
