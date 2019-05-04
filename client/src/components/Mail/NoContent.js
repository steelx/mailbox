import React, {useContext} from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { CREATE_DRAFT_MAIL } from "../../store/reducer";
import Context from "../../store/context";

const NoContent = ({ classes }) => {
  const {dispatch} = useContext(Context);

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => dispatch({type: CREATE_DRAFT_MAIL})}>
            Compose Mail
      </Button>
    </div>
  );
}

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
    fontSize: "18px",
    fontWeight: 100,
    backgroundColor: "#00B494",
    width: "100%"
  }
});

export default withStyles(styles)(NoContent);
