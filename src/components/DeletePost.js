import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';

// Components
import TheButton from '../components/Button';

// MUI components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Style
const styles = {

};

function DeletePost(props) {

    const [ open, setOpen ] = useState(false);
    const { classes } = this.props;

    const handleOpen = () => {

        setOpen(!open);
    };

    const deletePost = () => {

        props.deletePost(props.postId);
        handleOpen();
    };

    return (
        <>
            <TheButton 
                tip="Delete Post" 
                onClick={handleOpen} 
                btnClassName={classes.deleteButton}
            >
                <DeleteOutline color="secondary" />
            </TheButton>
            <Dialog 
                open={open}
                onClose={handleOpen}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this post?
                </DialogTitle>
                <DialogActions>
                    <Button 
                        onClick={handleOpen}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={deletePost}
                        color="secondary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
};

const mapActionsToProps = {
    deletePost
};

export default connect(null, mapActionsToProps)(withStyles(styles)(DeletePost));