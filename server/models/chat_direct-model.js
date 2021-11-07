const { Schema, model } = require("mongoose");
const Chat = require("../classes/cls_chat-ref");

const Chat_direct_Schema = new Schema({
  messages: {type: Array, default: []},
  messageCounter: {type: Number, default: 0}
});

module.exports = model("Chat_direct", Chat_direct_Schema);
