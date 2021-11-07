const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const userModel = require("../models/user-model");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log("ISNT EMPTY");
        return next(ApiError.BadRequest("validation error", errors.array()));
      }
      const { email, password, body } = req.body;
      const userData = await userService.registration(email, password, body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(201).send(`<h1> Account created, confirm your email </h1>`);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await userService.login(email, password);
      const {userData} = data
      
      if (!userData) {
        const {message} = data
        return res.status(200).json({message})
      }
      // console.log("2) further...")
      // console.log("login");
      // console.log(req.cookie);
      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      // console.log(req.cookies);
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      
      res.clearCookie("refreshToken");
      return res.send();
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new ApiError.UnauthoriezedError()
      }
      // console.log("refresh: ", refreshToken);
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
