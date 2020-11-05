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
    const [ postIdParam, setPostIdParam ] = useState(null)
    const postId = props.match.params.postId;

    console.log('postId from users: ', postId)

    if(postId !== postIdParam) {
        console.log('setting post param id from params')
        setPostIdParam(postId);
    };

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
    }, [postId, postIdParam]);

    const { posts, loading } = props.data;

    // markup for posts
    const postsMarkup = loading ? (
        <p>Loading data...</p>
    ) : (
        posts === null ? (
            <p>No posts from this user</p>
        ) : !postIdParam ? (
            posts.map(post => {
                console.log('returned with no post id param')
                return <Post key={post.postId} post={post} />
            })
        ) : (
            posts.map(post => {
                if(post.postId !== postIdParam) {
                    console.log('returned without opendialog')
                    return <Post key={post.postId} post={post} />
                } else {
                    console.log('returned with opendialog')
                    return <Post key={post.postId} post={post} openDialog />
                }
            })
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