import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
  LOAD_TOTALS_SUCCESS,
} from './actionTypes';

const INITIAL_STATE = {
  loading: false,
  accounts: [],
  list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return {...state, loading: true};
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case LOAD_TRANSACTIONS_FAILURE:
      return {...state, loading: false};
    case SAVE_TRANSACTION_REQUEST:
      return {...state, loading: true};
    case SAVE_TRANSACTION_SUCCESS:
      return {...state, transactions: action.payload, loading: false};
    case SAVE_TRANSACTION_FAILURE:
      return {...state, loading: false};
    case LOAD_TOTALS_SUCCESS:
      return {...state, ...action.payload};
    default:
  }
  return state;
};
