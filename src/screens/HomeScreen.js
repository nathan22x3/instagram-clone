import React from 'react';
import HomeHeader from '../components/home/HomeHeader';
import { FlatList } from 'react-native';
import Story from '../components/story/Story';
import PostItem from '../components/post/PostItem';

const data = [
  {
    id: 0,
    username: 'cyberbot_66',
    avatarUri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
  },
  {
    id: 1,
    username: 'pe_chang',
    avatarUri: 'https://i.ibb.co/W2QrMxg/user-1.jpg',
  },
];

const HomeScreen = () => {
  return (
    <>
      <HomeHeader />
      <FlatList
        ListHeaderComponent={Story}
        data={data}
        renderItem={({ item }) => <PostItem {...item} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </>
  );
};

export default HomeScreen;
