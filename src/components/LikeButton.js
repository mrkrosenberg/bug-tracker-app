import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

// Components
import TheButton from './Button';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function LikeButton(props) {

    const { authenticated } = props.user; 

    const likedPost = () => {

        if(props.user.likes && props.user.likes.find(like => like.postId === props.postId)) {
            return true;
        } else return false;
    };

    const likeThePost = () => {
        props.likePost(props.postId);
    };

    const unlikeThePost = () => {
        props.unlikePost(props.postId);
    };

    // Render like or unlike button, redirect if not logged in
    const likeButtonMarkup = !authenticated ? (
        <TheButton tip="like">
            <Link to="/login">
                <FavoriteBorder color="primary" />
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
    

    return (
        likeButtonMarkup
    );
};

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePost,
    unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
