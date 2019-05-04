import React, { useContext } from "react";
import { GoogleLogin} from "react-google-login";
import { GraphQLClient } from "graphql-request";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from "../../store/context";
import { LOGIN_USER, IS_LOGGED_IN } from "../../store/reducer";
import {ME_QUERY} from "../../graphql/queries";
import {setAccessToken} from './utils';

const Login = ({ classes }) => {
  const {dispatch} = useContext(Context);

  async function onSuccess (googleUser) {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      setAccessToken(idToken);
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: {authorization: idToken}
      });

      const data = await client.request(ME_QUERY);
      dispatch({type: LOGIN_USER, payload: data.me});
      dispatch({type: IS_LOGGED_IN, payload: googleUser.isSignedIn()});
    } catch (err) {
      onFailure(err);
    }
  };

  function onFailure(err) {
    console.error("Error GoogleLogin: ", err);
  }

  return (
    <section className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={
          {color: "rgb(66, 133, 244)"}
        }
      >
        Welcome to Sahaj Mailbox
      </Typography>
      <GoogleLogin
        clientId="156992429844-88tkja5l3l01meg1upcpf0u6i7nc5kct.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </section>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
