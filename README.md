# Mailbox

Mailbox is a React + GraphQL project created by Ajinkya Borade
- For login Im using Google Plus button, verfied in Node.js `controllers/UserController.js`
- Once logged in you can see Inbox, which makes GraphQL query `client/graphql/queries.js`
- Each user can see all Mails created by any user logged in
- You can mark mails as Unread or even delete them, Compose Mail; which calls GraphQL mutation `client/graphql/mutations.js`
- For client side state I'm using React Hooks with Context Provider (Reducer) `client/store`
- Bare in mind I'm using only 1 context file to keep minimum
- As well I have not desgined CSS entirely as per screenshots, I'm using Material UI for quick bootstrapping

## Installation

```bash
npm i && cd client && npm i
```

## Usage

First run the Apollo Server
```bash
npm start
```

Then run the client
```bash
cd client && npm start
```