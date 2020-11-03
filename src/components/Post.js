import React from 'react';
import { Link }from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Date formatting
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import TheButton from './Button';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

// MUI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Style
const styles = {
    card: {
        position: 'relative',
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

    // Destructured props
    const { 
        classes, 
        post: 
            { 
                body, 
                createdAt, 
                userImage, 
                userHandle, 
                postId, 
                likeCount, 
                commentCount 
            }, 
        user: { 
                authenticated, 
                credentials: { 
                    handle 
                } 
        } 
    } = props;

    dayjs.extend(relativeTime);

    // Render delete button if current user's post
    const deleteButtonMarkup = authenticated && userHandle === handle ? (
        <DeletePost postId={postId}/>
    ) : null;


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
                {deleteButtonMarkup}
                <Typography variant="body2" color="textSecondary" >
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" color="textSecondary" >
                    {body}
                </Typography>
                <LikeButton postId={postId} />
                <span>{likeCount} Likes</span>
                <TheButton tip="comments">
                    <ChatIcon color="primary" />
                </TheButton>
                <span>{commentCount} Comments</span>
                <PostDialog postId={postId} userHandle={userHandle} />
            </CardContent>
        </Card>
    );
};

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({

    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Post));