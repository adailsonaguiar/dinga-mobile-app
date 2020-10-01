import getRealm, {loadData, writeData} from './../../services/realm';
import {
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_FAILURE,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAILURE,
} from './actionTypes';
import messageResponse from '../../utils/messageResponse';

import {transactionType} from '../../schemas/TransactionSchema';

export const loadAccounts = (month, year) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_ACCOUNTS});
      const data = await loadData('contas');
      loadAccountsSuccess(dispatch, data);
    } catch (error) {
      loadAccountsFailure(dispatch);
    }
  };
};

const loadAccountsSuccess = (dispatch, accounts) => {
  dispatch({type: LOAD_ACCOUNTS_SUCCESS, payload: accounts});
};

const loadAccountsFailure = (dispatch) => {
  dispatch({type: LOAD_ACCOUNTS_FAILURE});
};

export const saveAccount = (account) => {
  return (dispatch) => {
    try {
      writeData('contas', account);
      dispatch(
        saveTransactions({
          ...account,
          description: 'Criação da conta',
          value: account.balance,
          type: transactionType.TRANSACTION_IN,
          accountId: account.account,
          status: 1,
          category: 1,
        }),
      );

      dispatch(loadAccounts());
    } catch (e) {
      messageResponse.error(e);
      return e;
    }
  };
};

export const saveTransactions = (transaction) => {
  return async (dispatch) => {
    try {
      await writeData('transaction', transaction);

      dispatch(loadTransactions());
    } catch (e) {
      messageResponse.error(e);
      return e;
    }
  };
};

export const loadTransactions = ({month}) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_TRANSACTIONS});
      const data = await loadData('transaction');
      dispatch({type: LOAD_TRANSACTIONS_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: LOAD_TRANSACTIONS_FAILURE});
      console.error(error);
    }
  };
};
