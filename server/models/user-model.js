const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
      chats: {type: Schema.Types.ObjectId, ref: "Chats_container"},
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      isActivated: { type: Boolean, default: false },
      activationLink: { type: String },
      name: { type: String, required: true },
      surname: { type: String, required: true },
      addit_info: {
            school: { type: String, default: null },
            country: { type: String, default: null },
            city: { type: String, default: null },
            relationships: { type: String, default: null },
      },
      chats: {type: Array, default: []},
      friends: {
            container: {type: Array, default: []},
            amount: {type: Number, default: 0}
      },
      subscribers: {
            container: {type: Array, default: []},
            amount: {type: Number, default: 0}
      },
      subscriptions: {
            container: {type: Array, default: []},
            amount: {type: Number, default: 0}
      },
      isAdmin: { type: Boolean, default: false },
});

module.exports = model("User", UserSchema);
