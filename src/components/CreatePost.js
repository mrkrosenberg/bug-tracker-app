import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { createPost } from '../redux/actions/dataActions';

// Components
import TheButton from './Button';

// MUI components
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
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Styles
const styles = theme => ({
    submitButton: {
        position: 'relative',
        marginTop: '15px',
        marginBottom: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        // top: '5%'
    }
});

export class CreatePost extends Component {

    state = {
        open: false,
        body: '',
        errors: {}
    };

    handleStateChange = () => {
        this.setState({
            body: ''
        })
    };

    static getDerivedStateFromProps(nextProps) {

        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            // this.handleStateChange();
            this.handleClose();
        } else if(nextProps.UI.errors) {
            return { errors: nextProps.UI.errors }
        }
        // if(nextProps.UI.errors) {
        //     return { errors: nextProps.UI.errors }
        // };
        return null;
    };

    handleOpen = () => {

        this.setState({ open: true });
    };

    handleClose = () => {

        this.setState({
            open: false,
            errors: {}
        });
    };

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.createPost({ 
            body: this.state.body
        });
    };

    render() {

        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;

        return (
            <>
                <TheButton onClick={this.handleOpen} tip="Create a post">
                    <AddIcon />
                </TheButton>
                <Dialog 
                    open={this.state.open} 
                    onClose={this.handleOpen}
                    fullWidth
                    maxWidth="sm"
                >
                    <TheButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </TheButton>
                    <DialogTitle>
                        Create a post
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField  
                                className={classes.textField}
                                name="body"
                                type="text"
                                labe="Post"
                                multiline
                                rows="3"
                                placeholder="Enter text here"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button 
                                className={classes.submitButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                Submit
                                { loading && (<CircularProgress size={30} className={classes.progressSpinner} /> )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
};

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapActionsToProps = {
    createPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreatePost));


