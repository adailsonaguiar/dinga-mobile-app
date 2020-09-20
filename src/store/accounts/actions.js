import getRealm from './../../services/realm';
import {
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_FAILURE,
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
          realm.create(
            'transaction',
            {
              ...account,
              description: 'Entrada de valor',
              value: 'balance',
              type: transactionType.TRANSACTION_IN,
              accountId: account.id,
              status: 1,
              category: 1,
            },
            true,
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
