import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import Button from './Button';

// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TheButton from '@material-ui/core/Button';

// Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


export class Navbar extends Component {
    render() {

        const { authenticated } = this.props;

        return (
            <>
                <AppBar>
                    <Toolbar className="nav-container">
                        { authenticated ? (
                            <>
                                <TheButton tip="Create a Post">
                                    <AddIcon color="primary" />
                                </TheButton>
                                <Link to="/">
                                    <TheButton tip="Home">
                                        <HomeIcon color="primary" />
                                    </TheButton>
                                </Link>
                                <TheButton tip="Notifications">
                                    <Notifications color="primary" />
                                </TheButton>
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
