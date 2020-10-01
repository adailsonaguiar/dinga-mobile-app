import getRealm, {getId, loadData, writeData} from './../../services/realm';
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
import {saveTransactions} from '../transactions/actions';

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
      console.log(account);
      // writeData('contas', account);
      dispatch(
        saveTransactions({
          ...account,
          description: 'Criação da conta',
          value: account.balance,
          type: transactionType.TRANSACTION_IN,
          accountId: 0,
          status: 1,
          category: 1,
        }),
      );

      // dispatch(loadAccounts());
    } catch (e) {
      messageResponse.error(e);
      return e;
    }
  };
};
