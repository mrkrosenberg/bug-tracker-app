import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { createPost } from '../redux/actions/userActions';

// Components
import TheButton from './Button';

// MUI components
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialogtitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// Styles
const styles = {

};

export class CreatePost extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
};

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,

};

mapStateToProps = (state) => ({
    UI: state.UI
});

mapActionsToProps = {
    createPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreatePost));


