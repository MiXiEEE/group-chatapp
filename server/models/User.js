const { model, Schema, mongoose } = require("mongoose");

// mongoose.Schema.Types.ObjectId   (if doesn't work can try:  mongoose.Types.ObjectId, ref"Message")
const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  image: { type: String },
  token: { type: String },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  //  messages: { type: [MessageSchema] },
});

const MessageSchema = new mongoose.Schema({
  body: { type: String },
  username: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("user", userSchema);
const Message = mongoose.model("Message", MessageSchema);
module.exports = { User, Message };
