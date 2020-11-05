import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import IconButton from './Button';
import CreatePost from './CreatePost';
import Notifications from './Notifications';

// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';


export class Navbar extends Component {
    render() {

        const { authenticated } = this.props;

        return (
            <>
                <AppBar>
                    <Toolbar className="nav-container">
                        { authenticated ? (
                            <>
                                <CreatePost />
                                <Link to="/">
                                    <IconButton tip="Home">
                                        <HomeIcon color="primary" />
                                    </IconButton>
                                </Link>
                                <Notifications color="primary" />
                            </>
                            ) : (
                            <>
                                <Button
                                    color="inherit" 
                                    component={Link} 
                                    to="/"    
                                >
                                    Home
                                </Button>
                                <Button 
                                    color="inherit" 
                                    component={Link} 
                                    to="/login"    
                                >
                                    Login
                                </Button>
                                <Button 
                                    color="inherit" 
                                    component={Link} 
                                    to="/signup"    
                                >
                                    Signup
                                </Button>
                            </>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </>
        )
    }
};

Navbar.propTypes = { 
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({

    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
