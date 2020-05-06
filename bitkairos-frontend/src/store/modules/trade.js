import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as exchangeAPI from 'lib/api/exchange';

//action types
const GET_INITIAL_RATE = 'trade/GET_INITIAL_RATE';
const SET_INDEX_OPTION = 'trade/SET_INDEX_OPTION';
const TOGGLE_SHOW_PINNED = 'trade/TOGGLE_SHOW_PINNED';
const UPDATE_TICKER = 'trade/UPDATE_TICKER';

//action creator
export const getInitialRate = createAction(
  GET_INITIAL_RATE,
  exchangeAPI.getInitialRate
);
export const setIndexOption = createAction(SET_INDEX_OPTION);
export const toggleShowPinned = createAction(TOGGLE_SHOW_PINNED);
export const updateTicker = createAction(UPDATE_TICKER);

//initial state
const initialState = Map({
  rate: List([]),
  index: Map({
    options: Map({
      sortBy: 'volume',
      asc: false,
      showPinned: false
    })
  })
});

//reducer
export default handleActions(
  {
    // []: (state, action) => {
    //   return state.setIn([], action.payload);
    // }
    ...pender({
      type: GET_INITIAL_RATE,
      onSuccess: (state, action) => {
        const { data: rate } = action.payload;

        return state.set('rate', fromJS(rate));
      }
    }),
    [SET_INDEX_OPTION]: (state, action) => {
      const { name, value } = action.payload;

      return state.setIn(['index', 'options', name], value);
    },
    [TOGGLE_SHOW_PINNED]: (state, action) => {
      return state.updateIn(
        ['index', 'options', 'showPinned'],
        (value) => !value
      );
    },
    [UPDATE_TICKER]: (state, action) => {
      const { payload: data } = action;
      const index = state
        .get('rate')
        .findIndex((ticker) => ticker.get('name') === data.name);

      return state.mergeIn(['rate', index], data);
    }
  },

  initialState
);
