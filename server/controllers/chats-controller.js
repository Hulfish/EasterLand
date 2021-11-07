const chatsService = require("../service/chats-service")
const jwt = require("jsonwebtoken")
const ApiError = require("../exceptions/api-error")
const userModel = require("../models/user-model")
const chat_directModel = require("../models/chat_direct-model")

class ChatsController {
    
    async getChats(req, res) {
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET).id
            if (!userId) {
                throw new ApiError.UnauthoriezedError("Wrong token") 
            }
            const {chats, usernames} =  await chatsService.getChats(userId)
            res.json({chats, usernames})
        } catch (e) {
            console.log(e)
        }
    }

    async getDirectChat (req, res) {
        try {
            // incudes call of _getChats_ /|\ function above to get id of chat
            const accessToken = req.headers.authorization.split(" ")[1]
            const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET).id
            const {chatting_with} = req.body
            const messages = await chatsService.getDirectChat(userId, chatting_with)
            res.json({messages})
        } catch (e) {
            console.log(e)
        }
    }

    async sendMessage (req, res) {
        try {
            const addressId = req.params.id
            const accessToken = req.headers.authorization.split(" ")[1]
            const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET).id
            const message = req.body.message
            const result = await chatsService.sendMessage(addressId, userId, message)
            if (!result) {
                res.json({message: "something went wrong"})
            }
            res.json({message: "message sent"})
        } catch (e) {
            console.log(e)
        }
    } 

    async initializeChat(req, res) {
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET).id
            if (!userId) {
                throw new ApiError.UnauthoriezedError("Wrong token") 
            }
            const secondMember = req.body.initialize_to
            await chatsService.initializeChat(userId, secondMember)
            req.status(201).send()
        } catch (e) {
            console.log(e)
        }
    }
    async getChatParticipantName(req, res) {
        try {
            const participantId = req.body.participantId
            const user = await userModel.findById(participantId)
            const fullname = user.name + " " + user.surname
            res.json({fullname})
        } catch (e) {
            console.log(e)
        }
        

    }
} 
module.exports = new ChatsController()