import compare_desc from "date-fns/compare_desc";

export const LOGIN_USER = "LOGIN_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const CREATE_DRAFT_MAIL = "CREATE_DRAFT_MAIL";
export const UPDATE_DRAFT_MAIL = "UPDATE_DRAFT_MAIL";
export const DELETE_DRAFT_MAIL = "DELETE_DRAFT_MAIL";
export const GET_MAILS = "GET_MAILS";
export const CREATE_MAIL = "CREATE_MAIL";
export const DELETE_MAIL = "DELETE_MAIL";
export const DELETE_MAILS = "DELETE_MAILS";
export const SET_UNREAD_COUNT = "SET_UNREAD_COUNT";
export const MARK_AS_READ = "MARK_AS_READ";

export function UserReducer(state, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        
        case IS_LOGGED_IN:
            return {
                ...state,
                isAuth: action.payload
            };

        case SIGNOUT_USER:
            return {
                ...state,
                isAuth: false,
                currentUser: null
            };

        case CREATE_DRAFT_MAIL:
            return {
                ...state,
                draftMail: {
                    title: "",
                    content: "",
                    from: "",
                    unread: true
                }
            };
        
        case SET_UNREAD_COUNT:
            return {
                ...state,
                unreadCount: action.payload
            }
        
        case DELETE_DRAFT_MAIL:
            return {
                ...state,
                draftMail: null
            };

        case UPDATE_DRAFT_MAIL:
            return {
                ...state,
                draftMail: action.payload
            };

        case GET_MAILS: {
            const sorted = action.payload.sort((a,b) => compare_desc(new Date(a.createdAt), new Date(b.createdAt)));
            return {
                ...state,
                mails: sorted
            };
        }
        
        case MARK_AS_READ: {
            const mailsIdsToMark = action.payload;
            const sorted = state.mails.map(m => {
                if (mailsIdsToMark.indexOf(m._id) !== -1) {
                    m.unread = false
                }
                return m
            })
            return {
                ...state,
                mails: sorted
            };
        }

        case CREATE_MAIL:
            const newMail = action.payload;
            const prevMails = state.mails.filter(p => p._id !== newMail._id);
            return {
                ...state,
                mails: [newMail, ...prevMails]
            };

        case DELETE_MAIL:
            const deleteMail = action.payload;
            return {
                ...state,
                mails: state.mails.filter(p => p._id !== deleteMail._id)
            };

        case DELETE_MAILS:
            const deleteMailIds = action.payload;
            return {
                ...state,
                mails: state.mails.filter(p => deleteMailIds.indexOf(p._id) === -1)
            };

        default:
            return state;
    }
}