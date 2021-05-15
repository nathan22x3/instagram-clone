import firebase from 'firebase';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SearchProfileHeader from '../components/search/SearchProfileHeader';
import SearchProfileUserInfo from '../components/search/SearchProfileUserInfo';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;

const SearchProfileScreen = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(userInfo.id)
      .collection('userPosts')
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((post) => {
          const id = post.id;
          const data = post.data();
          return { id, ...data };
        });

        setPosts(posts);
      });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => navigation.push('PostDetail', { post: item })}
      >
        <Image
          style={styles.itemImage}
          source={{ uri: item.image }}
          resizeMethod='resize'
        />
      </TouchableOpacity>
    ),
    []
  );

  const keyExtraction = useCallback((item) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => <SearchProfileUserInfo {...{ userInfo }} />,
    []
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <SearchProfileHeader {...{ userInfo }} />
      <FlatList
        style={styles.grid}
        data={posts}
        {...{ keyExtraction }}
        {...{ renderItem }}
        numColumns={3}
        {...{ ListHeaderComponent }}
      />
    </>
  );
};

export default SearchProfileScreen;

const styles = StyleSheet.create({
  grid: {
    paddingBottom: 10,
    height: 'auto',
  },
  item: {
    flex: 1 / 3,
    height: width / NUM_COLUMNS,
    margin: 1.5,
  },
  itemImage: {
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
