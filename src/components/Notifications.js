import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';

// MUI components
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// MUI icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

// Date formatting
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function Notifications(props) {

    const [ anchorElement, setAnchorElement ] = useState(null);

    return (
        <div>
            
        </div>
    );
};

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({

});

const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);