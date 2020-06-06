import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as exchangeAPI from 'lib/api/exchange';
import * as PoloAPI from 'lib/api/poloniex';
import * as OrderAPI from 'lib/api/orders';

//action types
const GET_INITIAL_RATE = 'trade/GET_INITIAL_RATE';
const SET_INDEX_OPTION = 'trade/SET_INDEX_OPTION';
const TOGGLE_SHOW_PINNED = 'trade/TOGGLE_SHOW_PINNED';

const UPDATE_TICKER = 'trade/UPDATE_TICKER';

const GET_ORDER_BOOK = 'trade/GET_ORDER_BOOK';
const RESET_ORDER_BOOK = 'trade/RESET_ORDER_BOOK';

const INITIALIZE_TRADE_SECTION = 'trade/INITIALIZE_TRADE_SECTION';
const CHANGE_TRADE_BOX_INPUT = 'trade/CHANGE_TRADE_BOX_INPUT';

const CREATE_ORDER = 'trade/CREATE_ORDER';

//action creator
export const getInitialRate = createAction(
  GET_INITIAL_RATE,
  exchangeAPI.getInitialRate
);
export const setIndexOption = createAction(SET_INDEX_OPTION);
export const toggleShowPinned = createAction(TOGGLE_SHOW_PINNED);
export const updateTicker = createAction(UPDATE_TICKER);
export const getOrderBook = createAction(GET_ORDER_BOOK, PoloAPI.getOrderBook);
export const resetOrderBook = createAction(RESET_ORDER_BOOK);
export const initializeTradeSection = createAction(INITIALIZE_TRADE_SECTION);
export const changeTradeBoxInput = createAction(CHANGE_TRADE_BOX_INPUT);
export const createOrder = createAction(
  CREATE_ORDER,
  OrderAPI.createOrder,
  (meta) => meta
);

//initial state
const initialState = Map({
  rate: List([]),
  index: Map({
    options: Map({
      sortBy: 'volume',
      asc: false,
      showPinned: false
    }),
    orderBook: Map({
      buy: List(),
      sell: List()
    })
  }),
  tradeSection: Map({
    buy: Map({
      price: 0,
      amount: 0
    }),
    sell: Map({
      price: 0,
      amount: 0
    }),
    disableButton: Map({
      buy: false,
      sell: false
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
    },
    ...pender({
      type: GET_ORDER_BOOK,
      onSuccess: (state, action) => {
        const { bids: buy, asks: sell } = action.payload.data;

        return state.set(
          'orderBook',
          Map({
            buy: fromJS(buy),
            sell: fromJS(sell)
          })
        );
      }
    }),
    [RESET_ORDER_BOOK]: (state, action) => {
      return state.set('orderBook', initialState.get('orderBook'));
    },
    [INITIALIZE_TRADE_SECTION]: (state, action) => {
      const { payload: initialPrice = 0 } = action;
      const boxState = Map({
        amount: 0,
        price: initialPrice
      });

      return state
        .setIn(['tradeSection', 'buy'], boxState)
        .setIn(['tradeSection', 'sell'], boxState);
    },
    [CHANGE_TRADE_BOX_INPUT]: (state, action) => {
      const { type, name, value } = action.payload;
      return state.setIn(['tradeSection', type, name], value);
    },
    ...pender({
      type: CREATE_ORDER,
      onPending: (state, action) => {
        const { sell } = action.meta;
        const type = sell ? 'sell' : 'buy';

        return state.setIn(['tradeSection', 'disableButton', type], true);
      },
      onSuccess: (state, action) => {
        const { sell } = action.meta;
        const type = sell ? 'sell' : 'buy';

        return state.setIn(['tradeSection', 'disableButton', type], false);
      },
      onError: (state, action) => {
        const { sell } = action.meta;
        const type = sell ? 'sell' : 'buy';

        return state.setIn(['tradeSection', 'disableButton', type], false);
      }
    })
  },

  initialState
);
