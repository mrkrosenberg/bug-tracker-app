import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

// Components
import TheButton from './Button';

// MUI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore'

// Date formatting
import dayjs from 'dayjs';
import { compose } from 'redux';

// Styles
const styles = ({

    invisibleSeparator: {
        border: 'none',
        margin: 4
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
    }
});

class PostDialog extends Component {

    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
        this.props.getPost(this.props.postId);
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };
    // handleDialogOpen = () => {

    //     this.setState({
    //         open: !this.state.open
    //     });
    //     if(this.state.open) {
    //         this.props.getPost(this.props.postId)
    //     }
    // };

    render() {

        const { 
            classes, 
            post:  { 
                postId, 
                body, 
                createdAt, 
                likeCount, 
                commentCount, 
                userImage, 
                userHandle 
            }, 
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200} />
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
                </Grid>
            </Grid>
        )

        return (
            <>
            <TheButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary" />
            </TheButton>
            <Dialog
                open={this.state.open} 
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
            >
               <TheButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </TheButton> 
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
            </>
        )

    };

};

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({

    post: state.data.post,
    UI: state.UI
});

const mapActionsToProps = {
    getPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));