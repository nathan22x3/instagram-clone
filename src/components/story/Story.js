import React, { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import StoryItem from './StoryItem';

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

const Story = () => {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { borderBottomColor: theme.border }]}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => <StoryItem {...item} />}
        keyExtractor={(item) => `${item.id}`}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 0.5,
  },
});
