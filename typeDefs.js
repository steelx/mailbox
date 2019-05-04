const { gql } =  require("apollo-server");

module.exports = gql`
    type User {
        _id: ID
        name: String
        email: String
        picture: String
    }

    type Mail {
        _id: ID
        createdAt: String
        title: String
        content: String
        from: String
        unread: Boolean
        author: User
        body: [Body]
    }

    type Body {
        text: String
        createdAt: String
        author: User
    }

    type Query {
        me: User,
        getMails: [Mail!]
    }

    input CreateMailInput {
        title: String
        content: String
        from: String
        unread: Boolean
    }

    type Mutation {
        createMail(input: CreateMailInput!): Mail,
        deleteMail(mailId: ID!): Mail,
        deleteMails(mailIds: [ID]): Boolean
        markAsRead(mailIds: [ID]): Boolean
        markAsUnread(mailIds: [ID]): Boolean
    }
`;