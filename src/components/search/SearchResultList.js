import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SearchResultItem from './SearchResultItem';

const SearchResultList = ({ results }) => {
  return (
    <FlatList
      style={styles.container}
      data={results}
      keyExtraction={(item) => item.id}
      renderItem={({ item }) => <SearchResultItem user={item} />}
    />
  );
};

export default SearchResultList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
});
