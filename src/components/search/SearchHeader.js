import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../../contexts/ThemeContext';
import TextInput from '../custom/TextInput';

const SearchHeader = ({ onChangeText }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <AntDesign name={'arrowleft'} color={theme.label} size={27} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchBox}
        placeholder={t('search')}
        {...{ onChangeText }}
      />
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  searchBox: {
    flex: 1,
    marginBottom: 0,
    marginLeft: 20,
    fontSize: 16,
  },
});
