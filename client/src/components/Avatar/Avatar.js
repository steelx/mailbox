import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from "../../store/context";

const Avatar = ({ classes }) => {
    const { state } = useContext(Context);
    const { currentUser } = state;
    return (
        <>
            <div className={classes.grow}>
                <img className={classes.picture} src={currentUser.picture} alt={currentUser.name} />
                <Typography
                    component="h2"
                    variant="body1"
                    color="inherit"
                    noWrap
                >
                    {currentUser.name}
                </Typography>
            </div>
        </>
    )
};


const styles = theme => ({
    grow: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
    },
    picture: {
        height: "50px",
        borderRadius: "90%",
        marginRight: theme.spacing.unit * 2
    }
});

export default withStyles(styles)(Avatar);