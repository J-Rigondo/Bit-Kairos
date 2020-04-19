import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

//action types
const CHANGE_DISPLAYNAME = 'register/CHANGE_DISPLAYNAME';
const SET_CURRENCY = 'register/SET_CURRENCY';
const SET_OPTION_INDEX = '/register/SET_OPTION_INDEX';
const CHECK_DISPLAYNAME = '/register/ CHECK_DISPLAYNAME';
const SUBMIT = 'register/SUBMIT';
const SOCIAL_REGISTER = 'register/SOCIAL_REGISTER';
const SET_ERROR = 'register/SET_ERROR';

//action creator
export const changeDisplayName = createAction(CHANGE_DISPLAYNAME);
export const setCurrency = createAction(SET_CURRENCY);
export const setOptionIndex = createAction(SET_OPTION_INDEX);
export const checkDisplayName = createAction(
  CHECK_DISPLAYNAME,
  AuthAPI.checkDisplayName
);
export const submit = createAction(SUBMIT, AuthAPI.register);
export const socialRegister = createAction(
  SOCIAL_REGISTER,
  AuthAPI.socialRegister
);
export const setError = createAction(SET_ERROR);

//initial state
const initialState = Map({
  displayName: '',
  currency: 'KRW',
  optionIndex: 0,
  displayNameExists: false,
  emailExists: false,
  error: null,
  result: null,
});

//reducer
export default handleActions(
  {
    [CHANGE_DISPLAYNAME]: (state, action) => {
      const { payload: displayName } = action;

      return state.set('displayName', displayName);
    },
    [SET_CURRENCY]: (state, action) => {
      const { payload: currency } = action;

      return state.set('currency', currency);
    },
    [SET_OPTION_INDEX]: (state, action) => {
      const { payload: index } = action;

      return state.set('optionIndex', index);
    },
    [SET_ERROR]: (state, action) => {
      const { payload: error } = action;

      return state.set('error', error);
    },
    ...pender({
      type: CHECK_DISPLAYNAME,
      onSuccess: (state, action) => {
        const { exists } = action.payload.data;
        return state.set('displayNameExists', exists);
      },
    }),
    ...pender({
      type: SUBMIT,
      onSuccess: (state, action) => {
        const { data: user } = action.payload;
        return state.set('result', user);
      },
      onFailure: (state, action) => {
        return state.set('error', '특수기호는 사용할 수 없습니다.');
      },
    }),
    ...pender({
      type: SOCIAL_REGISTER,
      onSuccess: (state, action) => {
        const { data: user } = action.payload;
        return state.set('result', user);
      },
      onFailure: (state, action) => {
        return state.set('error', '잘못된 정보입니다.');
      },
    }),
  },
  initialState
);
