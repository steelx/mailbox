import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import UnreadCountBadge from './UnreadBadge';
import Context from '../../store/context';
import { CHANGE_INBOX } from '../../store/reducer';

const styles = theme => ({
    root: {
        width: '100%',
        margin: "10px auto"
    },
    listItem: {
        paddingLeft: 0
    }
});


function Folders({ classes }) {
    const {dispatch} = useContext(Context)
    function renderRedirect(payload) {
        dispatch({type: CHANGE_INBOX, payload})
    }

    return (
        <div className={classes.root}>
            <Typography variant="title" noWrap>Folders</Typography>
            <List component="nav">
                <ListItem button className={classes.listItem} onClick={() => renderRedirect(true)}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    <UnreadCountBadge />
                </ListItem>
                <ListItem button className={classes.listItem} onClick={() => renderRedirect(false)}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav">
                <ListItem button className={classes.listItem}>
                    <ListItemText primary="Trash" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <ListItemText primary="Spam" />
                </ListItem>
            </List>
        </div>
    );
}


export default withStyles(styles)(Folders);