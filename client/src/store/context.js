import {createContext} from "react";


const Context = createContext({
    currentUser: null,
    isAuth: false,
    draftMail: null,
    mails: [],
    sent: [],
    unreadCount: 0,
    isInbox: true
});

export default Context;
