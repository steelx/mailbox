
export const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`;

export const GET_MAILS_QUERY = `
{
  getMails {
    _id
    createdAt
    title
    content
    unread
    to
    from
    author {
      _id
      name
      email
      picture
    }
  }
}
`;
