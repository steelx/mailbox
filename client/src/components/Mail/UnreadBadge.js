import React, { useContext } from 'react';

import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Context from '../../store/context';

const UnreadCountBadge = () => {
    const {state} = useContext(Context);
    if (state.unreadCount === 0) {
        return null;
    }
    return (
        <Badge badgeContent={state.unreadCount} max={999} color="primary">
            <MailIcon />
        </Badge>
    )
};

export default UnreadCountBadge;
