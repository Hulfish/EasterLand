const Router = require("express");
const { body } = require("express-validator");
const ChatsController = require("../controllers/chats-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const chatsrouter = Router();

chatsrouter.get("/getChats", authMiddleware, ChatsController.getChats)
chatsrouter.post("/get_direct_chat", authMiddleware, ChatsController.getDirectChat)
chatsrouter.post("/initialize_chat", authMiddleware, ChatsController.initializeChat)
chatsrouter.post("/send_message/:id", authMiddleware, ChatsController.sendMessage)
chatsrouter.post("/get_participant_name", authMiddleware, ChatsController.getChatParticipantName)


module.exports = chatsrouter;
