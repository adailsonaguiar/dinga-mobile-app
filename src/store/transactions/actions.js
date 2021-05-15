import {loadData, removeById, getId, writeData} from './../../services/realm';
import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
  LOAD_TOTALS_SUCCESS,
} from './actionTypes';
import {navigate} from '../../services/navService';
import {pages} from '../../routes';
import {showError} from '../../services/alertService';
import {getDate} from '../../utils/FunctionUtils';
import {transactionType} from '../../schemas/TransactionSchema';

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

      const dataTotals = await loadData(
        'totals',
        `month = '${month}' AND year = '${year}'`,
      );

      const totalsTransactionsIn = dataTotals.find(
        (item) => item.type === transactionType.TRANSACTION_IN,
      );
      const totalsTransactionsOut = dataTotals.find(
        (item) => item.type === transactionType.TRANSACTION_OUT,
      );

      totalsLoadSuccess(dispatch, {
        totalValueTransactionsIn: totalsTransactionsIn
          ? String(totalsTransactionsIn.value)
          : '0',
        totalValueTransactionsOut: totalsTransactionsOut
          ? String(totalsTransactionsOut.value)
          : '0',
      });
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

      const dataTotals = await loadData(
        'totals',
        `type ='${transaction.type}'  AND month = '${transaction.month}' AND year = '${transaction.year}'`,
      );

      /*  */
      if (dataTotals.length) {
        const [totals] = dataTotals;
        const withoutPrevValue =
          Number(totals.value / 100) - Number(transaction.initialValue);
        const sum = withoutPrevValue + Number(transaction.value / 100);

        saveTotalValuesBd({
          dispatch,
          value: sum * 100,
          transactionType: transaction.type,
          month: transaction.month,
          year: transaction.year,
          totals,
        });
      } else {
        saveTotalValuesBd({
          dispatch,
          value: transaction.value,
          transactionType: transaction.type,
          month: transaction.month,
          year: transaction.year,
        });
      }

      /*  */
      navigate(pages.transactions);
      saveTransactionsSuccess(dispatch);
      getDate().then((date) =>
        dispatch(
          loadTransactions({
            month: Number(date.month),
            year: Number(date.year),
          }),
        ),
      );
    } catch (e) {
      showError(e);
      saveTransactionsFailure(dispatch);
    }
  };
};

export const deleteTransaction = (transaction) => {
  return async (dispatch) => {
    try {
      await removeById('transaction', transaction.id);

      const dataTotals = await loadData(
        'totals',
        `type ='${transaction.type}'  AND month = '${transaction.month}' AND year = '${transaction.year}'`,
      );
      const [totals] = dataTotals;
      console.log(transaction);
      const sum = Number(totals.value / 100) - Number(transaction.initialValue);
      saveTotalValuesBd({
        dispatch,
        value: sum * 100,
        transactionType: transaction.type,
        month: transaction.month,
        year: transaction.year,
        totals,
      });

      getDate().then((date) =>
        dispatch(
          loadTransactions({
            month: Number(date.month),
            year: Number(date.year),
          }),
        ),
      );
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

const totalsLoadSuccess = (dispatch, totals) => {
  dispatch({type: LOAD_TOTALS_SUCCESS, payload: totals});
};

export async function saveTotalValuesBd({
  value,
  month,
  year,
  dispatch,
  transactionType,
  totals,
}) {
  if (!!totals?.id) {
    const id = totals.id;
    writeData('totals', {
      id,
      value: String(value),
      month: month,
      year: year,
      type: transactionType,
    });
  } else {
    const finalId = await getId('totals');
    writeData('totals', {
      id: finalId,
      value: String(value),
      month: month,
      year: year,
      type: transactionType,
    });
  }

  /* 
  TRANSACTION_IN: 'TRANSACTION_IN',
  TRANSACTION_OUT: 'TRANSACTION_OUT',
  */

  if (transactionType === 'TRANSACTION_IN')
    totalsLoadSuccess(dispatch, {
      totalValueTransactionsIn: String(value),
    });
  if (transactionType === 'TRANSACTION_OUT')
    totalsLoadSuccess(dispatch, {
      totalValueTransactionsOut: String(value),
    });
}
