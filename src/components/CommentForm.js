import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux 
import { connect } from 'react-redux';
import { submitComment } from '../redux/actions/dataActions';

// MUI components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Styles
const styles = {
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    textField: {
        margin: '10px auto 10px auto'
    }
};

class CommentForm extends Component {

    state = {
        body: '',
        errors: {}
    };

    componentDidUpdate(prevProps) {
  
        if(prevProps.UI.errors !== this.props.UI.errors) {
            this.setState({
                errors: this.props.UI.errors
            });
        };
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submitComment(this.props.postId, { body: this.state.body });
    };

    render() {

        const { classes, authenticated } = this.props;
        const { errors } = this.state;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={10} style={{textAlign: 'center', margin: '0 auto'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        className={classes.textField}
                        name="body"
                        type="text"
                        label="Comment"
                        error={errors?.error ? true : false}
                        helperText={errors?.error}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button 
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>
                {/* <hr className={classes.visibleSeparator} /> */}
            </Grid>
        ) : null;
    
        return (
            commentFormMarkup
        );
    };
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

const mapActionsToProps = {
    submitComment
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));