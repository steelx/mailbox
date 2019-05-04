import React, { useContext } from "react";
import classNames from 'classnames';

import { withStyles } from "@material-ui/core/styles";
import Context from "../store/context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Signout from "./Auth/Signout";
import UnreadCountBadge from "./Mail/UnreadBadge";
import Avatar from "./Avatar/Avatar";

import {drawerWidth} from './Sidebar';

const Header = ({ classes, open, handleDrawerOpen }) => {
  const { state } = useContext(Context);
  const { currentUser } = state;

  return (
    <AppBar className={classNames(classes.appBar, { [classes.appBarShift]: open, })}>
        <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          {/* title & logo */}
          <div className={classes.grow}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              Mailbox
            </Typography>
          </div>

          {
            currentUser && (
              <>
                <Avatar />
                <PaddedBadge />
                <Signout />
              </>
            )
          }
        </Toolbar>
      </AppBar>
  );
};

const PaddedBadge = () => <div style={{margin: "0 2em"}}><UnreadCountBadge /></div>;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#FFF",
    color: "#333",
    boxShadow: "0 1px 2px -2px #333",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: "#00B494",
    fontSize: 45
  },
});

export default withStyles(styles)(Header);
