import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

//action types
const TOGGLE_LOGIN_MODAL = 'auth/TOGGLE_LOGIN_MODAL';
const SET_MODAL_MODE = 'auth/SET_MODAL_MODE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';
const CHECK_EMAIL = 'auth/CHECK_EMAIL';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
const FIND_PASSWORD = 'auth/FIND_PASSWORD';
const REAL_EMAIL = 'auth/REAL_EMAIL';

//action creator
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL);
export const setModalMode = createAction(SET_MODAL_MODE);
export const changeInput = createAction(CHANGE_INPUT);
export const setError = createAction(SET_ERROR);
export const checkEmail = createAction(CHECK_EMAIL, AuthAPI.checkEmail);
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin);
export const socialLogin = createAction(SOCIAL_LOGIN, AuthAPI.socialLogin);
export const findPwd = createAction(FIND_PASSWORD, AuthAPI.findPwd);
export const realEmail = createAction(REAL_EMAIL, AuthAPI.realEmail);

//initial state
const initialState = Map({
  modal: Map({
    visible: false,
    mode: 'login'
  }),
  forms: Map({
    email: '',
    password: ''
  }),
  error: null,
  loginResult: null,
  socialInfo: null,
  redirectToRegister: false
});

//reducer
export default handleActions(
  {
    [TOGGLE_LOGIN_MODAL]: (state, action) => {
      const visible = state.getIn(['modal', 'visible']);
      if (visible) {
        return state.setIn(['modal', 'visible'], false);
      }
      return state.setIn(['modal', 'visible'], true);
    },
    [SET_MODAL_MODE]: (state, action) => {
      return state
        .setIn(['modal', 'mode'], action.payload)
        .set('forms', initialState.get('forms'))
        .set('error', null);
    },
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['forms', name], value);
    },
    [SET_ERROR]: (state, action) => {
      return state.set('error', fromJS(action.payload));
    },
    ...pender({
      type: CHECK_EMAIL,
      onSuccess: (state, action) => {
        const { exists } = action.payload.data;
        return exists
          ? state.set('error', Map({ email: '메일이 이미 존재합니다.' }))
          : state;
      }
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => {
        const { data: loginResult } = action.payload;

        return state.set('loginResult', Map(loginResult)).set('error', null);
      },
      onFailure: (state, action) => {
        return state.set(
          'error',
          Map({ localLogin: '정보 오류 또는 비활성화 계정입니다.' })
        );
      }
    }),
    ...pender({
      type: SOCIAL_LOGIN,
      onSuccess: (state, action) => {
        const { data: loginResult } = action.payload;

        if (loginResult.accessToken) {
          return state
            .set('redirectToRegister', true)
            .set('socialInfo', loginResult);
        }
        return state.set('loginResult', Map(loginResult)).set('error', null);
      }
    }),
    ...pender({
      type: FIND_PASSWORD,
      onSuccess: (state, action) => {
        return state;
      }
    }),
    ...pender({
      type: REAL_EMAIL,
      onSuccess: (state, action) => {
        return state;
      }
    })
  },
  initialState
);
