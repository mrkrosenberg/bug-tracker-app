import React from 'react';
import PropTypes from 'prop-types';

// MUI components
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// Assets
import AvatarImage from '../images/avatar.png';

// Styles
const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    coverImage: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 20,
        backgroundColor: '#00dcd4',
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    halfLine: {
        height: 15, 
        width: '50%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.4)'
    }
};

function PostSkeleton(props) {

    const { classes } = props;

    const skeletonContent = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.coverImage} image={AvatarImage} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))

    return (
        <>
            {skeletonContent}
        </>
    );
};

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(PostSkeleton);