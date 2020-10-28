import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

// MUI Components
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const styles = (theme) => ({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  });

function Profile(props) {

    const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated }} = props;

    const handleImageChange = (e) => {

        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        props.uploadImage(formData);
    };

    const handleEditPicture = () => {

        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    const handleLogout = () => {

        props.logoutUser();
    };
    
    // Component markup
    let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img 
                        className="profile-image" 
                        src={imageUrl} 
                        alt="profile"
                    />
                    <input 
                        type="file" 
                        id="imageInput" 
                        hidden="hidden"
                        onChange={handleImageChange}
                    />
                    <Tooltip title="Edit profile picture" placement="top">
                        <IconButton className="button" onClick={handleEditPicture} >
                            <EditIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5" >
                        @{handle}
                    </MuiLink>
                    <hr/>
                    { bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <>
                            <LocationOn color="primary" />
                            <span>{location}</span>
                        </>
                    )}
                    {website && (
                        <> 
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener, noreferer">
                                {' '}{website}
                            </a>
                            <hr/>
                        </>
                    )}
                    <CalendarToday color="primary" /> {' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                <Tooltip title="Logout" placement="top">
                    <IconButton onClick={handleLogout}>
                        <KeyboardReturn color="primary" />
                    </IconButton>
                </Tooltip>
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                No profile found...
            </Typography>
            <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Login
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup">
                    Signup
                </Button>
            </div>
        </Paper>
    )) : (<p>loading...</p>);

    return profileMarkup;
};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

    user: state.user
});

const mapActionsToProps = {
    logoutUser, 
    uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));