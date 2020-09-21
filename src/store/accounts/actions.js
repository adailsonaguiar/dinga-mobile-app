import getRealm from './../../services/realm';
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
  return (dispatch) => {
    dispatch({type: LOAD_ACCOUNTS});
    getRealm()
      .then((date) => {
        const data = date.objects('contas').sorted('id', 1);
        /* const data = date
          .objects('contas')
          .filtered(`month = '${month}' AND year = '${year}'`)
          .sorted('id', 1); */
        loadAccountsSuccess(dispatch, data);
      })
      .catch((error) => {
        loadAccountsFailure(dispatch);
      });
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
    getRealm().then((realm) => {
      try {
        realm.write(() => {
          realm.create('contas', account, true);
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
        });
        dispatch(loadAccounts());
      } catch (e) {
        messageResponse.error(e);
        return e;
      }
    });
  };
};

export const saveTransactions = (transaction) => {
  return (dispatch) => {
    getRealm().then((realm) => {
      try {
        realm.write(() => {
          realm.create('transaction', transaction, true);
        });
        dispatch(loadTransactions());
      } catch (e) {
        messageResponse.error(e);
        return e;
      }
    });
  };
};

export const loadTransactions = ({month}) => {
  return (dispatch) => {
    dispatch({type: LOAD_TRANSACTIONS});
    getRealm()
      .then((date) => {
        const data = date.objects('transaction').sorted('id', 1);
        dispatch({type: LOAD_TRANSACTIONS_SUCCESS, payload: data});
      })
      .catch((error) => {
        dispatch({type: LOAD_TRANSACTIONS_FAILURE});
        console.error(error);
      });
  };
};
