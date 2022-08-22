const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    password: String!
    image: String
    token: String
    messages: [Message]
  }

  type Message {
    body: String
    username: String
  }

  input MessageInput {
    body: String
    username: String
  }

  input RegisterInput {
    username: String
    password: String
    image: String
  }

  input LoginInput {
    username: String
    password: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    sendMessage(messageInput: MessageInput): Message
  }

  type Query {
    users: [User]
    messages: [Message]
  }

  type Subscription {
    MessageAdded: Message
  }
`;
