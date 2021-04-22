import {loadData, removeById, writeData} from './../../services/realm';
import {
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_FAILURE,
  LOAD_TOTALS_SUCCESS,
} from './actionTypes';
import {showError} from '../../services/alertService';

export const loadAccounts = () => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_ACCOUNTS});
      const data = await loadData('contas');
      loadAccountsSuccess(dispatch, data);

      const valuesTotals = await loadData('totals');
      if (valuesTotals.length) {
        const {totalValueAccounts, totalValueTransactions} = valuesTotals[0];
        totalsLoadSuccess(dispatch, {
          totalValueAccounts,
          totalValueTransactions,
        });
      }
    } catch (error) {
      messageResponse.error(error);
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

const totalsLoadSuccess = (dispatch, totals) => {
  dispatch({type: LOAD_TOTALS_SUCCESS, payload: totals});
};

export const saveAccount = (account) => {
  return async (dispatch) => {
    try {
      writeData('contas', account);
      const data = await loadData('totals');

      if (data.length) {
        const {totalValueAccounts, totalValueTransactions} = data[0];
        const withoutPrevValue =
          Number(totalValueAccounts / 100) - Number(account.initialBalance);
        console.log(`${totalValueAccounts / 100} - ${account.initialBalance}`);
        const sum = withoutPrevValue + Number(account.balance / 100);
        console.log(`${withoutPrevValue} + ${account.balance / 100}`);

        writeData('totals', {
          id: 1,
          totalValueAccounts: String(sum * 100),
          totalValueTransactions: totalValueTransactions,
        });
        totalsLoadSuccess(dispatch, {
          totalValueAccounts: sum * 100,
          totalValueTransactions,
        });
      } else {
        const accountBalance = String(account.balance);
        writeData('totals', {
          id: 1,
          totalValueAccounts: accountBalance,
          totalValueTransactions: '0',
        });
        totalsLoadSuccess(dispatch, {
          totalValueAccounts: accountBalance,
          totalValueTransactions: '0',
        });
      }
    } catch (e) {
      showError(e);
      return e;
    }
  };
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    try {
      await removeById('contas', id);
      dispatch(loadAccounts());
    } catch (e) {
      showError(e);
    }
  };
};
