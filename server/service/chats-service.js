const ChatWorker = require("../classes/cls_chat-worker")
const ChatRef = require("../classes/cls_chat-ref")
const Message = require("../classes/cls_message")
const chats_containerModel = require("../models/chats_container-model")
const chat_directModel = require("../models/chat_direct-model")
const userModel = require("../models/user-model")

class ChatsService {
    async getChats(userId) {
        try {
            const user = await userModel.findById(userId)
            const chats = user.chats
            
            var usernames = {}
            for (let i = 0; i < chats.length; i++){
                const chat = chats[i]
                const user = await userModel.findById(chat.address)
                const username = user.name + " " + user.surname
                usernames[chat.address] = username
            }
            return {chats, usernames}
        } catch (e) {
            console.log(e)
        }
    }

    async initializeChat(user1_id, user2_id) {
        try {
            const chat = await chat_directModel.create({worker: new ChatWorker})
            const chatRef = JSON.parse(JSON.stringify(chat._id))
            // console.log("initChat: 1) chatRef: ", chatRef)
            const user1 = await userModel.findById(user1_id)
            const user2 = await userModel.findById(user2_id)
            
            user1.chats.push(new ChatRef(user2_id, chatRef))
            user2.chats.push(new ChatRef(user1_id, chatRef))
            // console.log("initChat: 2) user1.chats: ", user1.chats)
            await user1.save()
            await user2.save()
            return chatRef
        } catch (e) {
            console.log(e)
        }
    }

    async getDirectChat (user_id, address_user_id) {
        try {
            const user = await userModel.findById(user_id)
            // console.log("1) user: ", user)
            let chatRef = 0;
            if (user.chats) {
                // console.log("2) loop: ...")
                loop:for (let i = 0; i < user.chats.length; i++) {
                    if (user.chats[i].address === address_user_id) {
                        chatRef = user.chats[i].chatRef
                        break loop
                    }   
                } 
            }
            if (!chatRef) {
                return null
            }
            const chat = await chat_directModel.findById(chatRef)
            // console.log(chat)
            return chat.messages
        } catch (e) {
            console.log(e)
        }
    }

    async sendMessage(address_id, from_id, message) {
        try {
            const user = await userModel.findById(from_id)
            // console.log("1) user: ", user)
            const addressUser = await userModel.findById(address_id)
            let chatRef = 0;
            if (user.chats) {
                // console.log("2) loop: ...")
                loop:for (let i = 0; i < user.chats.length; i++) {
                    if (user.chats[i].address === address_id) {
                        chatRef = user.chats[i].chatRef
                        break loop
                    }   
                } 
            }

            // console.log("3) user.chats: ",user.chats, ", chatRef: ", chatRef)
            if (!chatRef) {
                // console.log("4) chatRef is not valid: ")
                chatRef = await this.initializeChat(address_id, from_id)
            }
            // console.log("5) chatRef: ", chatRef)
            const chat = await chat_directModel.findById(chatRef)
            // console.log("6) chat: ", chat)
            chat.messages.push(new Message(from_id, message, chat.message_counter))
            // console.log("7) chat.messages: ", chat.messages)
            await chat.save()
            
            return 1
                
        } catch (e) {
            console.log(e)
        }
    }
} 

module.exports = new ChatsService()