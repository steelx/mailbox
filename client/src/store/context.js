import {createContext} from "react";


const Context = createContext({
    currentUser: null,
    isAuth: false,
    draftMail: null,
    mails: [],
    unreadCount: 0
});

export default Context;
