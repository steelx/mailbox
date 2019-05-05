export const CREATE_MAIL_MUTATION = `
    mutation($title: String, $content: String, $from: String, $to: String, $unread: Boolean) {
        createMail(input: {
            title: $title
            content: $content
            from: $from
            to: $to
            unread: $unread
        }) {
            _id
            createdAt
            title
            content
            unread
            from
            author {
                 _id
                 name
                 email
            }
        }
    }
`;

export const DELETE_MAIL_MUTATION = `
    mutation($mailId: ID!) {
        deleteMail(mailId: $mailId) {
            _id
        }
    }
`;

export const DELETE_MAILS_MUTATION = `
    mutation($mailIds: [ID!]) {
        deleteMails(mailIds: $mailIds)
    }
`;

export const MARK_AS_READ_MUTATION = `
    mutation($mailIds: [ID!]) {
        markAsRead(mailIds: $mailIds)
    }
`;

export const MARK_AS_UNREAD_MUTATION = `
    mutation($mailIds: [ID!]) {
        markAsRead(mailIds: $mailIds)
    }
`;
