import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

// Components
import TheButton from './Button';
import LikeButton from './LikeButton';
import Comments from './Comments';

// MUI components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Date formatting
import dayjs from 'dayjs';

// Styles
const useStyles = {

    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    contentContainer: {
        paddingTop: 20,
        marginTop: 30
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
};


function PostDialog(props) {


    const [ open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        props.getPost(props.postId);
    };

    const handleClose = () => {
        setOpen(false)
    };


    const { 
        classes, 
        post:  { 
            postId, 
            body, 
            createdAt, 
            likeCount, 
            commentCount, 
            userImage, 
            userHandle,
            comments
        }, 
        UI: { loading }
    } = props;

    // Render spinner or post dialog content
    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={10}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7} className={classes.contentContainer}>
                <Typography
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                    variant="h5"
                >
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">
                    {body}
                </Typography>
                <LikeButton postId={postId} />
                <span>{likeCount} likes</span>
                <TheButton tip="comments">
                    <ChatIcon color="primary" />
                </TheButton>
                <span>{commentCount} Comments</span>
            </Grid>
            <hr className={classes.visibleSeparator}/>
            <Comments comments={comments} />
        </Grid>
    )

    return (
        <>
        <TheButton onClick={handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
            <UnfoldMore color="primary" />
        </TheButton>
        <Dialog
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <TheButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                <CloseIcon />
            </TheButton> 
            <DialogContent className={classes.dialogContent}>
                {dialogMarkup}
            </DialogContent>
        </Dialog>
        </>
    )
};


PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.data.post,
    UI: state.UI
});

const mapActionsToProps = {
    getPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(PostDialog));