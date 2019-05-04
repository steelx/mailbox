import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";

import Context from "../../store/context";
import NoContent from "./NoContent";
import CreateMail from "./CreateMail";


const ComposeMail = ({ classes }) => {
  const { state } = useContext(Context);

  let Content;
  if (state.draftMail) {
    Content = CreateMail;
  } else {
    Content = NoContent;
  }
  return (
    <div className={classes.root}>
      <Content />
    </div>
  );
};

const styles = {
  root: {
    width: "100%"
  }
};

export default withStyles(styles)(ComposeMail);
