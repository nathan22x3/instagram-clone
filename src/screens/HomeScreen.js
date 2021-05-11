import React, { useCallback, useEffect } from 'react';
import HomeHeader from '../components/home/HomeHeader';
import { FlatList } from 'react-native';
import Story from '../components/story/Story';
import Post from '../components/post/Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserPosts } from '../redux/actions/user';
import { fetchPosts } from '../redux/actions/post';

const HomeScreen = ({ posts, fetchUserPosts, fetchPosts, list }) => {
  const renderItem = useCallback(({ item }) => <Post {...item} />, []);
  const keyExtractor = useCallback((item) => `${item.id}`, []);

  useEffect(() => {
    fetchPosts();
    fetchUserPosts();
    console.log({ posts, list });
  }, []);

  return (
    <>
      <HomeHeader />
      <FlatList
        ListHeaderComponent={Story}
        data={posts}
        {...{ renderItem }}
        {...{ keyExtractor }}
      />
    </>
  );
};

const mapStateToProps = ({ user, post }) => ({
  posts: user.posts,
  list: post.list,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUserPosts, fetchPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
