import React from 'react';
import { Link }from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

// Date formatting
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import TheButton from '../components/Button';

// MUI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { FavoriteBorderSharp } from '@material-ui/icons';

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

    const { classes, post : { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }, user: { authenticated } } = props;

    const likedPost = () => {

        if(props.user.likes && props.user.likes.find(like => like.postId === props.post.postId)) {
            return true;
        } else return false;
    };

    const likeThePost = () => {
        console.log('like post')
        props.likePost(props.post.postId);
    };

    const unlikeThePost = () => {
        console.log('unlike post')
        props.unlikePost(props.post.postId);
    };

    // Render like or unlike button, redirect if not logged in
    const likeButton = !authenticated ? (
        <TheButton tip="like">
            <Link to="/login">
                <FavoriteBorderSharp color="primary" />
            </Link>
        </TheButton>
    ) : (
        likedPost() ? (
            <TheButton tip="Unlike" onClick={unlikeThePost}>
                <FavoriteIcon color="primary" />
            </TheButton>
        ) : (
            <TheButton tip="Like" onClick={likeThePost}>
                <FavoriteBorder color="primary" />
            </TheButton>
        )
    );

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
                {likeButton}
                <span>{likeCount} Likes</span>
                <TheButton tip="comments">
                    <ChatIcon color="primary" />
                </TheButton>
                <span>{commentCount} Comments</span>
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