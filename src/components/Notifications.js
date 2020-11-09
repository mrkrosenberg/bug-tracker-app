import React, { Fragment, useState } from 'react';
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
    const { notifications }= props;
    let notificationIcon;
    dayjs.extend(relativeTime);

    // Conditionally change notifications icon to render
    if(notifications && notifications.length > 0) {
        notifications.filter(note => note.read === false).length > 0 ? 
            (notificationIcon = (
                <Badge badgeContent={notifications.filter(note => note.read === false).length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            ) 
        ) : (
            notificationIcon = <NotificationsIcon />
        )
    } else {
        notificationIcon = <NotificationsIcon />
    };

    const handleOpen = (e) => {
        setAnchorElement(e.target);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    // Communicate with backend and mark notifications read
    const onMenuOpened = () => {
        let unreadNotificationIds = props.notifications.filter(note => !note.read)
        .map(note => note.notificationId);
        props.markNotificationsRead(unreadNotificationIds);
    };

    // Notifications Markup
    let notificationsMarkup = notifications && notifications.length > 0 ? (
        notifications.map(note => {
            const type = note.type === 'like' ? 'liked' : 'commented on';
            const time = dayjs(note.createdAt).fromNow();
            const iconColor = note.read ? 'primary' : 'secondary';
            // conditionally render icons
            const icon = note.type === 'like' ? (
                <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
            ) : (
                <ChatIcon color={iconColor} style={{marginRight: 10}} />
            );

            return (
                <MenuItem key={note.createdAt} onClick={handleClose}>
                    {icon}
                    <Typography 
                        component={Link}
                        to={`/users/${note.recipient}/post/${note.postId}`}
                        color="inherit"
                        variant="body1"
                    >
                        {note.sender} {type} your post {time}
                    </Typography>
                </MenuItem>
            )
        })
    ) : (
        <MenuItem onClick={handleClose}>
            No new notifications
        </MenuItem>
    );

    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton 
                    aria-owns={anchorElement ? 'simple-menu' : undefined} 
                    aria-haspopup="true" 
                    onClick={handleOpen}
                >
                    {notificationIcon}
                </IconButton>
            </Tooltip>
            <Menu   
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={handleClose}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </Fragment>
    );
};

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

const mapActionsToProps = {
    markNotificationsRead
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);