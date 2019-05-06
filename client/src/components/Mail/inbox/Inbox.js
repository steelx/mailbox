import React, { useEffect, useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';

import {displayDateTime} from '../utils';
import Context from '../../../store/context';
import { useClient } from "../../Auth/client";
import { GET_MAILS, DELETE_MAILS, SET_UNREAD_COUNT, MARK_AS_READ } from '../../../store/reducer';
import { GET_MAILS_QUERY } from '../../../graphql/queries';
import { DELETE_MAILS_MUTATION, MARK_AS_READ_MUTATION } from "../../../graphql/mutations";
import InboxHead from './InboxHead';

const Inbox = ({ classes }) => {

    const client = useClient();
    const { state, dispatch } = useContext(Context);

    const [checkedIds, setCheckedIds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMailsAsync()
    }, []);

    async function getMailsAsync() {
        setLoading(true);
        const { getMails } = await client.request(GET_MAILS_QUERY);
        dispatch({ type: GET_MAILS, payload: getMails });
        setLoading(false);
    }

    async function deleteMultipleMailsAsync(mailIds) {
        setLoading(true);
        await client.request(DELETE_MAILS_MUTATION, {mailIds});
        dispatch({type: DELETE_MAILS, payload: mailIds});
        setLoading(false);
    }

    async function markAsReadAsync(mailIds) {
        await client.request(MARK_AS_READ_MUTATION, {mailIds});
        dispatch({type: MARK_AS_READ, payload: mailIds});
        dispatch({ type: SET_UNREAD_COUNT, payload: state.unreadCount - mailIds.length });
    }

    function handleCheck(_id, checked) {
        if (checked) {
            setCheckedIds([...checkedIds, _id])
        } else {
            setCheckedIds(checkedIds.filter(id => id !== _id))
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            {loading && <LinearProgress />}
            <Paper square className={classes.paper}>
                <InboxHead 
                    onDelete={() => deleteMultipleMailsAsync(checkedIds)}
                    onRefresh={() => getMailsAsync()}
                    onMarkUnread={() => markAsReadAsync(checkedIds)}
                    unreadCount={state.unreadCount} />
                <List className={classes.list}>
                    {state.mails.map(({ _id, createdAt, title, content, unread, from }) => (
                        <ListItem button key={_id} className={classes.listItem}
                            style={{backgroundColor: unread && "#F9F8F8"}}>
                            <Checkbox tabIndex={-1} disableRipple onChange={(e, checked) => handleCheck(_id, checked)} />
                            <ListItemText primary={from} className={classes.from} />
                            <ListItemText primary={title} secondary={content} className={classes.content} />
                            <ListItemText primary={displayDateTime(createdAt)} className={classes.date} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}

const styles = (theme) => ({
    root: {
        display: "flex",
        flex: 2,
        height: "calc(100vh - 150px)",
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    
    paper: {
        paddingBottom: 50,
        width: "100%"
    },
    from: {
        width: "20%",
        flexGrow: 1
    },
    content: {
        width: "50%",
        flexGrow: 1
    },
    date: {
        width: "20%",
        flexGrow: 1,
        textAlign: "right"
    },
    list: {
        marginBottom: theme.spacing.unit * 2,
        display: "flex",
        flexFlow: "row wrap",
    },
    listItem: {
        borderTop: "1px solid #E9ECEE",
    },
});

export default withStyles(styles)(Inbox);
