import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

// Components
import Post from '../components/Post';
import StaticProfile from '../components/StaticProfile';

// MUI components
import Grid from '@material-ui/core/Grid';


function Users(props) {

    const [ profile, setProfile ] = useState(null);

    useEffect(() => {
        const handle = props.match.params.handle;
        props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                setProfile(res.data.user)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const { posts, loading } = props.data;

    // markup for posts
    const postsMarkup = loading ? (
        <p>Loading data...</p>
    ) : (
        posts === null ? (
            <p>No posts from this user</p>
        ) : (
            posts.map(post => <Post key={post.postId} post={post} />)
        )
    );

    return (
        <Grid className="grid-container" container spacing={10}>
            <Grid 
                item
                sm={8}
                xs={12}
            >
                {postsMarkup}
            </Grid>
            <Grid 
                item
                sm={4}
                xs={12}
            >
                {profile === null ? (
                    <p>Loading...</p>
                ) : (                
                    <StaticProfile profile={profile} />
                )}
            </Grid>
        </Grid>
    );
};

Users.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getUserData
};

export default connect(mapStateToProps, mapActionsToProps)(Users);