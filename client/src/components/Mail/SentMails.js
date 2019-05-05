import React, { useEffect, useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import {displayDateTime} from './utils';
import Context from '../../store/context';
import { useClient } from "../Auth/client";
import { GET_MAILS } from '../../store/reducer';
import { GET_MAILS_QUERY } from '../../graphql/queries';

const SentMails = ({ classes }) => {

    const client = useClient();
    const { state, dispatch } = useContext(Context);
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


    return (
        <div className={classes.root}>
            <CssBaseline />
            {loading && <LinearProgress />}
            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                    Sent
                </Typography>
                <List className={classes.list}>
                    {state.sent.map(({ _id, createdAt, title, content, unread, from }) => (
                        <ListItem button key={_id} className={classes.listItem}
                            style={{backgroundColor: unread && "#F9F8F8"}}>
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
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(SentMails);
