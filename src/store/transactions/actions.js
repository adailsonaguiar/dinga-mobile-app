import {getId, loadData, writeData} from './../../services/realm';
import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
} from './actionTypes';
import {error} from '../../utils/messageResponse';

const loadTransactionsSuccess = (dispatch, accounts) => {
  dispatch({type: LOAD_TRANSACTIONS_SUCCESS, payload: accounts});
};

const loadTransactionsFailure = (dispatch) => {
  dispatch({type: LOAD_TRANSACTIONS_FAILURE});
};

export const loadTransactions = ({month}) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_TRANSACTIONS});
      const data = await loadData('transaction');
      loadTransactionsSuccess(dispatch, data);
    } catch (error) {
      loadTransactionsFailure();
      error(error);
    }
  };
};

const saveTransactionsSuccess = (dispatch) => {
  dispatch({type: SAVE_TRANSACTION_SUCCESS});
};

const saveTransactionsFailure = (dispatch) => {
  dispatch({type: SAVE_TRANSACTION_FAILURE});
};

export const saveTransactions = (transaction) => {
  return async (dispatch) => {
    try {
      dispatch({type: SAVE_TRANSACTION_REQUEST});
      const newId = await getId('transaction');
      transaction.id = newId;
      transaction.date = new Date();
      await writeData('transaction', transaction);
      // console.info(transaction);
      saveTransactionsSuccess(dispatch);
    } catch (e) {
      error(e);
      saveTransactionsFailure(dispatch);
    }
  };
};
