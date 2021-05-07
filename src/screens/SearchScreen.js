import firebase from 'firebase';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import SearchHeader from '../components/search/SearchHeader';
import SearchResultList from '../components/search/SearchResultList';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const onChangeText = debounce((value) => {
    setSearchText(value);

    firebase
      .firestore()
      .collection('users')
      .where('username', '>=', searchText)
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((user) => {
          const id = user.id;
          const data = user.data();
          return { id, ...data };
        });

        setResults(users);
      });
  }, 500);

  return (
    <>
      <SearchHeader {...{ onChangeText }} />
      <SearchResultList {...{ results }} />
    </>
  );
};

export default SearchScreen;
