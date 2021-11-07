const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const tokenModel = require("../models/token-model");


class UserService {
  async registration(email, password, body) {
    try {
      const name = body.name.toLowerCase()
      const surname = body.surname.toLowerCase()

      const candidate = await userModel.findOne({ email });
      if (candidate) {
        throw ApiError.BadRequest(
          "Пользователь с email " + email + "  уже существует",
        );
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();

      const user = await userModel.create({
        email,
        password: hashPassword,
        activationLink,
        name,
        surname
      });
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`,
      );

      return 1
    } catch (e) {
      console.log(e)
    }
    
    
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User with this email is not found");
    }
    if (!user.isActivated) {
      return {message: "Unactivated"}
    }

    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw ApiError.BadRequest("Wrong password");
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { userData: {tokens, ...userDto} };
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("No such users found");
    }
    user.isActivated = true;
    await user.save();
  }

  async logout(refreshtoken) {
    const token = await tokenService.removeToken(refreshtoken);
    return token;
  }
  async refresh(refreshToken) {
    
    if (!refreshToken) {
      throw ApiError.UnauthoriezedError();
    }
    // console.log("step_1");
    const userData = await tokenService.validateRefreshToken(refreshToken);
    // const tokenFromDb = await tokenService.findToken(refreshToken);
    const tokenFromDb = await tokenService.findTokenById(userData.id);
    // console.log("step_2");
    if (!userData || !tokenFromDb) {
      // console.log("UserData: ", userData, ", tokenFromDb: ", tokenFromDb);
      throw ApiError.UnauthoriezedError();
    }
    // console.log("step_3");
    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    // console.log("step_4");
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // console.log("step_5");
    return {
      ...tokens,
      user: userDto,
    };
  }
  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }
  async deleteUser(req, res) {
    try {
        const userId = req.body.userId;
        const candidate = await userModel.findById(userId);
        if (!candidate) {
          return res.status(404).send({ message: "user_not_found" }); 
        }
        const refreshToken = await tokenModel.findOne({user: userId })
        if (refreshToken) {
          await tokenModel.deleteOne({user: userId})
        }
        await userModel.deleteOne({ _id: userId });
        res.status(200).send({ message: "deleted" });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserService();
