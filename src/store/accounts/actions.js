import {loadData, removeById, writeData} from './../../services/realm';
import {
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_FAILURE,
} from './actionTypes';
import {showError} from '../../services/alertService';

export const loadAccounts = (month, year) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_ACCOUNTS});
      const data = await loadData('contas');
      loadAccountsSuccess(dispatch, data);
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

export const saveAccount = (account) => {
  return () => {
    try {
      writeData('contas', account);
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
