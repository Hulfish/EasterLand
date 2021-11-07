const Router = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const commandrouter = Router();
const jwt = require("jsonwebtoken")
const ApiError = require("../exceptions/api-error")


commandrouter.post("/command", authMiddleware, (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1]
    const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET).id
    if (!userId) {
        throw new ApiError.UnauthoriezedError("Wrong token")
    }

    const command  = req.body.command
    if (command == "becomeAdmin") {
        return res.json({message: "You are admin!"})
    }
    res.json({message: "success"})
});

module.exports = commandrouter;
