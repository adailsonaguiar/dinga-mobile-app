import {
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_FAILURE,
} from './actionTypes';

const INITIAL_STATE = {
  loading: false,
  accounts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS:
      return {...state, loading: true};
    case LOAD_ACCOUNTS_SUCCESS:
      return {...state, accounts: action.payload, loading: false};
    case LOAD_ACCOUNTS_FAILURE:
      return {...state, loading: false};
    default:
  }
  return state;
};
