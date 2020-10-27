import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

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


export class signup extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        };
    };

    handleSubmit = (e) => {

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };

        e.preventDefault();
        this.setState({
            loading: true
        });
        axios.post('/signup', newUserData)
            .then(res => {
                console.log('signup result: ', res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            });
    };

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

        const { classes } = this.props;
        const { errors, loading } = this.state;

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
                        signup
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
                        <TextField 
                            className={classes.textField} 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false} 
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField 
                            className={classes.textField} 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Handle"
                            helperText={errors.handle}
                            error={errors.handle ? true : false} 
                            value={this.state.handle} 
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
                            Signup
                            {loading && (
                                <CircularProgress 
                                    className={classes.progress} 
                                    size={30}
                                />
                            )}
                        </Button>
                        <br/>
                        <small>
                            already have an account? login <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
};

signup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);