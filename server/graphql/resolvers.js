const { User, Message } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ApolloError } = require("apollo-server-errors");
const { subscribe } = require("graphql");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    async registerUser(_, { registerInput: { username, password, image } }) {
      // Find if another user is registered with such username
      const oldUser = await User.findOne({ username });

      // Throw an error if user exists
      if (oldUser) {
        throw new ApolloError(
          "User exists with username: " + username,
          "USER_ALREADY_EXISTS"
        );
      }
      // Encrypt password
      var encryptedPassword = await bcrypt.hash(password, 10);

      // Build out mongoose model(User)
      const newUser = new User({
        username: username,
        password: encryptedPassword,
        messages: [],
      });

      // Create our JWT (attatch to our User model), "UNSAFE_STRING need to be a variable in different safe location"
      const token = jwt.sign(
        { user_id: newUser._id, username },
        "UNSAFE_STRING",
        { expiresIn: "2h" }
      );

      newUser.token = token;

      // Save our user in MongoDB
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async loginUser(_, { loginInput: { username, password } }) {
      // See if a user exists with the username
      const userExists = await User.findOne({ username });
      // check if userExists and if the entered password equals the encrypted password
      if (userExists && (await bcrypt.compare(password, userExists.password))) {
        // Create a new token
        const token = jwt.sign(
          { user_id: userExists._id, username },
          "UNSAFE_STRING",
          {
            expiresIn: "2h",
          }
        );

        userExists.token = token;

        return {
          id: userExists.id,
          ...userExists._doc,
        };
      } else {
        // If user doesn't exist, return error
        throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
      }
    },

    async sendMessage(_, { messageInput: { body, username } }) {
      const user = await User.findOne({ username });
      // Building out mongodb model
      const newMsg = new Message({
        body: body,
        username: user.username,
        user: user._id,
      });
      // Saving message in database
      const res = await newMsg.save();

      pubsub.publish("MESSAGE_ADDED", {
        MessageAdded: {
          body: body,
          username: user.username,
          user: user._id,
        },
      });

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },

  Query: {
    users: (parent, args, context, info) => {
      return User.find().then((users) => {
        return users.map((r) => ({ ...r._doc }));
      });
    },
    messages: async () => {
      return await Message.find();
    },
  },

  // Subscription: {
  //   MessageAdded: {
  //     async subscribe(_, __, { pubsub }) {
  //       return pubsub.asyncIterator("MESSAGE_ADDED");
  //     },
  //   },
  // },
  Subscription: {
    MessageAdded: {
      subscribe: () => pubsub.asyncIterator("MESSAGE_ADDED"),
    },
  },
};

module.exports = resolvers;
