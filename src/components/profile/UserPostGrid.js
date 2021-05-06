import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;

const UserPostList = ({ posts }) => {
  const formatData = (data, numColumns = NUM_COLUMNS) => {
    const numberOfFullRow = Math.floor(data.length / numColumns);
    let numberOfElementLastRow = data.length - numberOfFullRow * numColumns;
    while (
      numberOfElementLastRow !== numColumns &&
      numberOfElementLastRow !== 0
    ) {
      data.push({ id: Math.random().toString(36), hidden: true });
      numberOfElementLastRow++;
    }

    return data;
  };

  return (
    <FlatList
      style={styles.container}
      data={formatData(posts)}
      keyExtraction={(item) => item.id}
      renderItem={({ item }) => {
        if (item.hidden) {
          return <View style={[styles.item, styles.itemInvisible]} />;
        }

        return (
          <View style={styles.item}>
            <Image
              style={styles.itemImage}
              source={{ uri: item.downloadURL }}
            />
          </View>
        );
      }}
      numColumns={3}
    />
  );
};

export default UserPostList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  item: {
    height: width / NUM_COLUMNS,
    flex: 1,
    aspectRatio: 1,
    margin: 1.5,
  },
  itemImage: {
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
