import React, {useState, useContext} from "react";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MailIcon from "@material-ui/icons/Mail";
import ClearIcon from "@material-ui/icons/Clear"; 
import SaveIcon from "@material-ui/icons/SaveTwoTone";

import Context from "../../store/context";
import {DELETE_DRAFT_MAIL, CREATE_MAIL, SET_UNREAD_COUNT} from "../../store/reducer";
import {CREATE_MAIL_MUTATION} from "../../graphql/mutations";
import { useClient } from "../Auth/client";

const CreateMail = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ to, setTo ] = useState("");
  const [ processing, setProcessing ] = useState(false);

  function resetForm() {
    setTitle("");
    setContent("");
    setTo("");
    dispatch({type: DELETE_DRAFT_MAIL});
  }

  async function onSubmit(e) {
    e.preventDefault();
    setProcessing(true);

    try {
      // const { title, content, to, unread} = state.draftMail;
      const {createMail} = await client.request(CREATE_MAIL_MUTATION, {
        title, content, from:state.currentUser.email, to, unread: true
      });

      dispatch({type: CREATE_MAIL, payload: createMail});
      setProcessing(false);
    } catch(e) {
      console.log("Submittion error: ", e);
      setProcessing(false);
    }
    dispatch({type: DELETE_DRAFT_MAIL});
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography className={classes.alignCenter} component="h2" variant="h6" color="secondary" align="center">
        <MailIcon className={classes.iconLarge} /> Create Mail
      </Typography>
      <div className={classes.contentField}>
        <TextField
          name="title"
          label="Subject"
          placeholder="Insert Subject"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          name="to"
          label="To email"
          placeholder="to"
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className={classes.contentField}>
        <TextField name="content" label="Content" multiline rows="6" margin="normal" fullWidth variant="outlined"
          onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <Button className={classes.button} variant="contained" color="primary" onClick={() => resetForm()}>
          <ClearIcon className={classes.leftIcon} /> Discard
        </Button>
        <Button className={classes.button} type="submit" variant="contained" color="primary"
          disabled={!title.trim() || !content.trim() || !to.trim() || processing}
        >
          <SaveIcon className={classes.rightIcon} /> Save
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreateMail);
