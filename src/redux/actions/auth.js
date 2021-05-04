import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getErrorMessage } from '../../utils';
import { SET_AUTH_ERRORS } from '../constants';

export const login = (email, password) => (dispatch) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      dispatch({
        type: SET_AUTH_ERRORS,
        errors: { login: getErrorMessage(error.message) },
      });
    });
};

export const signup = (email, password) => (dispatch) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      firestore().collection('users').doc(user.uid).set({ email: user.email });
    })
    .catch((error) => {
      dispatch({
        type: SET_AUTH_ERRORS,
        errors: { signup: getErrorMessage(error.message) },
      });
    });
};

export const logout = () => (dispatch) => {
  auth()
    .signOut()
    .catch((error) => {
      dispatch({
        type: SET_AUTH_ERRORS,
        errors: { logout: getErrorMessage(error.message) },
      });
    });
};
