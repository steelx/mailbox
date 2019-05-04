import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ComposeMail from './ComposeMail';
import InboxFolders from './InboxFolders';

const InboxSidekick = ({classes}) => {


    return (
        <div className={classes.root}>
            <ComposeMail />
            <InboxFolders />
        </div>
    )
};

const styles = {
    root: {
      width: 400,
      height: "calc(100vh - 64px)",
      overflowY: "hidden",
      padding: "20px",
      boxSizing: "border-box"
    },
    rootMobile: {
      maxWidth: "100%",
      maxHeight: 300,
      overflowX: "hidden",
      overflowY: "scroll"
    }
  };
  
  export default withStyles(styles)(InboxSidekick);
