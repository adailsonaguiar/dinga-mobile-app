import {loadData, removeById, writeData} from './../../services/realm';
import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
} from './actionTypes';
import {navigate} from '../../services/navService';
import {pages} from '../../routes';
import {showError} from '../../services/alertService';
import {getDate} from '../../utils/FunctionUtils';
import {saveTotalValuesBd} from '../accounts/actions';

const loadTransactionsSuccess = (dispatch, transactions) => {
  dispatch({type: LOAD_TRANSACTIONS_SUCCESS, payload: transactions});
};

const loadTransactionsFailure = (dispatch) => {
  showError('Erro ao carregar transações');
  dispatch({type: LOAD_TRANSACTIONS_FAILURE});
};

export const loadTransactions = ({month, year}) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_TRANSACTIONS});
      const data = await loadData(
        'transaction',
        `month = '${month}' AND year = '${year}'`,
      );
      loadTransactionsSuccess(dispatch, data);

      // console.log(data);
    } catch (error) {
      loadTransactionsFailure(dispatch);
      showError(error);
    }
  };
};

const saveTransactionsSuccess = (dispatch) => {
  dispatch({type: SAVE_TRANSACTION_SUCCESS});
  getDate().then((date) =>
    dispatch(
      loadTransactions({month: Number(date.month), year: Number(date.year)}),
    ),
  );
};

const saveTransactionsFailure = (dispatch) => {
  dispatch({type: SAVE_TRANSACTION_FAILURE});
};

export const saveTransactions = (transaction) => {
  return async (dispatch) => {
    try {
      dispatch({type: SAVE_TRANSACTION_REQUEST});
      await writeData('transaction', transaction);

      const data = await loadData('totals');

      /*  */
      if (data.length) {
        const {totalValueAccounts, totalValueTransactions} = data[0];
        const withoutPrevValue =
          Number(totalValueTransactions / 100) -
          Number(transaction.initialValue);
        const sum = withoutPrevValue + Number(transaction.value / 100);

        saveTotalValuesBd({
          totalValueAccounts,
          totalValueTransactions: sum * 100,
          dispatch,
        });
      } else {
        saveTotalValuesBd({
          totalValueAccounts: '0',
          totalValueTransactions: account.value,
          dispatch,
        });
      }

      /*  */
      navigate(pages.dash);
      saveTransactionsSuccess(dispatch);
    } catch (e) {
      showError(e);
      saveTransactionsFailure(dispatch);
    }
  };
};

export const deleteTransaction = (id) => {
  return async (dispatch) => {
    try {
      await removeById('transaction', id);
      dispatch(loadTransactions({}));
    } catch (e) {
      console.error(e);
      showError(e);
    }
  };
};

export function loadTransactionsByAccount() {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_TRANSACTIONS});
      const data = await loadData('transaction', 'accountId = 1 LIMIT(5)');
      loadTransactionsSuccess(dispatch, data);
    } catch (error) {
      loadTransactionsFailure();
      showError(error);
    }
  };
}


// export async function saveTotalValuesBd({
//   totalValueAccounts,
//   totalValueTransactions,
//   dispatch,
// }) {
//   const date = await getDate();
//   const dataTotals = await loadData(
//     'totals',
//     `month = '${date.month}' AND year = '${date.year}'`,
//   );

//   console.info('aquii', dataTotals);

//   if (!dataTotals.length) {
//     const [{id}] = dataTotals;
//     writeData('totals', {
//       id,
//       totalValueAccounts: String(totalValueAccounts),
//       totalValueTransactions: String(totalValueTransactions),
//       month: date.month,
//       year: date.year,
//     });
//     totalsLoadSuccess(dispatch, {
//       totalValueAccounts,
//       totalValueTransactions,
//     });
//   }
// }