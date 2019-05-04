import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/ThreeSixty';
import UnreadIcon from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';

const InboxHead = ({ classes, unreadCount, onDelete, onMarkUnread, onRefresh }) => {


    return (
        <div className={classes.root}>
            <Typography className={classes.text} variant="h5" gutterBottom>
                Inbox {unreadCount && `(${unreadCount})`}
            </Typography>
            
            <Button variant="outlined" className={classes.button} onClick={onRefresh}>
                <RefreshIcon /> Refresh
            </Button>
            <Button variant="outlined" className={classes.button} onClick={onMarkUnread}>
                <UnreadIcon />
            </Button>
            <Button variant="outlined" className={classes.button} onClick={onDelete}>
                <DeleteIcon />
            </Button>
        </div>
    )
}

const styles = (theme) => ({
    root: {
        overflow: "hidden"
    },
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    button: {
        marginLeft: "10px",
        fontSize: "12px"
    }
});

export default withStyles(styles)(InboxHead);
