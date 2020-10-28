import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// Main Icon
import Icon from '../images/favicon.ico';

// MUI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        margin: '20px auto 20px auto'
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

// const styles = (theme) => ({
//     ...theme
// });


export class login extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    };

    static getDerivedStateFromProps(nextProps) {

        if(nextProps.UI.errors) {
            return { errors: nextProps.UI.errors }
        };
        return null;
    };

    handleSubmit = (e) => {

        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };  
        this.props.loginUser(userData, this.props.history);      
    };

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
                    <img 
                        src={Icon} 
                        alt="icon" 
                        className={classes.image} 
                    />
                    <Typography 
                        variant="h2" 
                        className={classes.pageTitle} 
                    >
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            className={classes.textField} 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField 
                            className={classes.textField} 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false} 
                            value={this.state.password} 
                            onChange={this.handleChange}
                            fullWidth
                        />
                        { errors.general && (
                            <Typography 
                                variant="body2"
                                className={classes.customError}
                            >
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress 
                                    className={classes.progress} 
                                    size={30}
                                />
                            )}
                        </Button>
                        <br/>
                        <small>
                            don't have an account? sign up <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
};

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
