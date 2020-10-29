import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions'; 

// Mui Components
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

// Components 
import Post from '../components/Post';
import Profile from '../components/Profile';

const styles = {

};

export class home extends Component {

    componentDidMount() {

        this.props.getPosts();
    };


    render() {

        const { classes } = this.props;
        const { posts, loading } = this.props.data;
        let postsList = !loading ? (posts.map(post => <Post key={post.postId} post={post}/>)) : <p>Loading...</p>;

        return (
            <Grid className="grid-container" container spacing={10}>
                <Grid 
                    item
                    sm={8}
                    xs={12}
                >
                    {postsList}
                </Grid>
                <Grid 
                    item
                    sm={4}
                    xs={12}
                >
                    <Profile />
                </Grid>
            </Grid>
        )
    }
};

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({

    data: state.data
});

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
