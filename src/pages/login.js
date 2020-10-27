import React, { Component } from 'react';
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
        marginTop: 20
    }
};


export class login extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        };
    };

    handleSubmit = (e) => {

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        e.preventDefault();
        this.setState({
            loading: true
        });
        axios.post('/login', userData)
            .then(res => {
                console.log('login result: ', res.data);
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
                        <Button 
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
};

login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
