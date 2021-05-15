import firebase from 'firebase';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import SearchHeader from '../components/search/SearchHeader';
import SearchResultList from '../components/search/SearchResultList';

const SearchScreen = () => {
  const [results, setResults] = useState([]);

  const onChangeText = debounce((value) => {
    firebase
      .firestore()
      .collection('users')
      .where('username', '>=', value)
      .get()
      .then((snapshot) => {
        const users = snapshot.docs
          .filter((user) => user.id !== firebase.auth().currentUser.uid)
          .map((user) => {
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
