import React from "react";
import { withStyles } from "@material-ui/core/styles";


import Inbox from './Mail/Inbox';
import InboxSidekick from './Mail/InboxSidekick';

const Mailbox = ({classes}) => {


    return (
        <div className={classes.root}>
            <InboxSidekick />
            <Inbox />
        </div>
    );
};

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingRight: "20px"
    },
    rootMobile: {
        display: "flex",
        flexDirection: "column-reverse"
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
  
export default withStyles(styles)(Mailbox);
