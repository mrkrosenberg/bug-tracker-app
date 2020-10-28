import React from 'react';
import { Link }from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

// Date formatting
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Style
const styles = {
    card: {
        display: 'flex',
        marginBottom: 20, 
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

function Post(props) {

    const { classes, post : { body, createdAt, userImage, userHandle, postId, likeCount, commentCount } } = props;

    dayjs.extend(relativeTime);

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImage}
                title="Profile Image"
            />
            <CardContent className={classes.content}>
                <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`}
                    color="primary"
                >
                    {userHandle}
                </Typography>
                <Typography variant="body2" color="textSecondary" >
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" color="textSecondary" >
                    {body}
                </Typography>
            </CardContent>
        </Card>
    );
};

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({

    user: state.user
});

const mapActionsToProps = {
    likePost, 
    unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));