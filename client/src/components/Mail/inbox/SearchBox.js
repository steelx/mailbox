import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import debounce from 'awesome-debounce-promise';

import TextField from '@material-ui/core/TextField';
import Context from '../../../store/context';
import { UPDATE_MAILS, GET_MAILS } from '../../../store/reducer';
import { getMailsAsync } from '../utils';

const SearchBox = ({ classes }) => {
    const {state, dispatch} = useContext(Context);

    async function search(str) {
        if (str === "") {
            const mails = await getMailsAsync();
            dispatch({
                type: GET_MAILS,
                payload: mails
            })
        } else {
            dispatch({
                type: UPDATE_MAILS,
                payload: state.mails.filter(m => m.title.toLowerCase().includes(str.toLowerCase()))
            })
        }
        
    }

    const searchDebounced = debounce(search, 200);


    return (
        <TextField
            id="search"
            label="Search"
            className={classes.textField}
            margin="normal"
            onChange={(e) => searchDebounced(e.target.value)}
            variant="outlined"
        />
    )
}

const styles = (theme) => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

export default withStyles(styles)(SearchBox);
