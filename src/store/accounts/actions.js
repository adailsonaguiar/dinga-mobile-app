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
        const {value} = valuesTotals[0];
        totalsLoadSuccess(dispatch, {
          totalValueAccounts: value,
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

export async function saveTotalValuesBd({totalValueAccounts, dispatch}) {
  writeData('totals', {
    id: 1,
    value: String(totalValueAccounts),
    month: '0',
    year: '0',
    type: 'accounts',
  });
  totalsLoadSuccess(dispatch, {
    totalValueAccounts,
  });
}

export const saveAccount = (account) => {
  return async (dispatch) => {
    try {
      writeData('contas', account);
      const data = await loadData('totals', "type = 'accounts'");

      if (data.length) {
        const [{value}] = data;
        const withoutPrevValue =
          Number(value / 100) - Number(account.initialBalance);
        const sum = withoutPrevValue + Number(account.balance / 100);

        saveTotalValuesBd({
          totalValueAccounts: sum * 100,
          dispatch,
        });
      } else {
        saveTotalValuesBd({
          totalValueAccounts: account.balance,
          dispatch,
        });
      }

      dispatch(loadAccounts());
    } catch (e) {
      showError(e);
      return e;
    }
  };
};

export const deleteAccount = (account) => {
  return async (dispatch) => {
    try {
      await removeById('contas', account.id);
      const initialValueAccount = account.initialBalance * 100;

      const data = await loadData('totals', 'id = 1');
      if (data.length) {
        const {value} = data[0];
        const sum = value - initialValueAccount;

        saveTotalValuesBd({
          totalValueAccounts: sum,
          dispatch,
        });
      }

      dispatch(loadAccounts());
    } catch (e) {
      showError(e);
    }
  };
};
