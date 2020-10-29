import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// MUI components
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialogtitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    image: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        position: 'relative',
        margin: '20px auto 20px auto',
        float: 'right'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
};

export class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    handleOpen = () => {

        this.setState({
            open: true
        });
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {

        this.setState({
            open: false
        });
    };

    componentDidMount() {

        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    };

    mapUserDetailsToState = (credentials) => {

        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    };

    handleChange = (e) => {
        
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit = () => {

        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {

        const { classes } = this.props;

        return (
            <>
                <Tooltip title="Edit profile" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    fullWidth 
                    maxWidth="sm"
                >
                    <Dialogtitle>
                        Edit profile
                    </Dialogtitle>
                    <DialogContent>
                        <form>
                            <TextField 
                                name="bio" 
                                type="text" 
                                label="Bio" 
                                multiline 
                                rows="3" 
                                placeholder="A short bio about yourself" 
                                className={classes.textField} 
                                value={this.state.bio} 
                                onChange={this.handleChange} 
                                fullWidth 
                            />
                            <TextField 
                                name="website" 
                                type="text" 
                                label="Website" 
                                placeholder="Your personal/professional website" 
                                className={classes.textField} 
                                value={this.state.website} 
                                onChange={this.handleChange} 
                                fullWidth 
                            />
                            <TextField 
                                name="location" 
                                type="text" 
                                label="Location" 
                                placeholder="Location" 
                                className={classes.textField} 
                                value={this.state.location} 
                                onChange={this.handleChange} 
                                fullWidth 
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" >
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
};

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

const mapActionsToProps = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));




