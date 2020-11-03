import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Date formatting
import dayjs from 'dayjs';

// MUI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Styles
const styles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1',
        marginBottom: 20
    },
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
};


function Comments(props) {

    const { comments, classes } = props;

    return (
        <Grid container>
            { comments && comments.map(comment => {
                
                const { body, createdAt, userImage, userHandle } = comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={10}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="comment" className={classes.commentImage} />
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography component={Link} to={`/users/${userHandle}`} variant="h5" color="primary">
                                            {userHandle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator}/>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr className={classes.visibleSeparator}/>
                    </Fragment>
                )
            })}
        </Grid>
    );
};

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);