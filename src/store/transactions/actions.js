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

import {TRANSACTION_STATUS} from '../../utils/transactionStatus';
import {SCHEMAS} from '../../schemas';
import {saveAccount} from '../accounts/actions';

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
        SCHEMAS.TRANSACTION,
        `month = '${month}' AND year = '${year}'`,
      );
      loadTransactionsSuccess(dispatch, data);

      /*
      const dataTotals = await loadData(
        SCHEMAS.TOTALS,
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
      */
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

async function updateAccountBalance(dispatch, transaction) {
  const accounts = await loadData(
    SCHEMAS.ACCOUNT,
    `id ='${transaction.accountId}'`,
  );

  const transactionAccount = accounts[0];
  const prevValueTransaction = transaction.initialValue * 100;
  let newAccountBalance = 0;

  if (transaction.type === transactionType.TRANSACTION_IN)
    newAccountBalance =
      transactionAccount.balance + transaction.value - prevValueTransaction;

  if (transaction.type === transactionType.TRANSACTION_OUT) {
    newAccountBalance =
      transactionAccount.balance + prevValueTransaction - transaction.value;
  }
  const newAccountValues = {
    id: transactionAccount.id,
    balance: newAccountBalance,
  };

  dispatch(saveAccount(newAccountValues));
}

async function getDataTotals(transaction) {
  const dataTotals = await loadData(
    SCHEMAS.TOTALS,
    `type ='${transaction.type}'  AND month = '${transaction.month}' AND year = '${transaction.year}'`,
  );
  return dataTotals;
}

function incrementDataTotals(transaction, totals) {
  const withoutPrevValue =
    Number(totals.value / 100) - Number(transaction.initialValue);
  return withoutPrevValue + Number(transaction.value / 100);
}

export async function saveTotalValuesBd({
  value,
  transaction,
  dispatch,
  totals,
}) {
  writeData(SCHEMAS.TOTALS, {
    value: String(value),
    month: transaction.month,
    year: transaction.year,
    type: transaction.type,
  });

  if (transactionType === 'TRANSACTION_IN')
    totalsLoadSuccess(dispatch, {
      totalValueTransactionsIn: String(value),
    });
  if (transactionType === 'TRANSACTION_OUT')
    totalsLoadSuccess(dispatch, {
      totalValueTransactionsOut: String(value),
    });
}

export const saveTransactions = (transaction) => {
  return async (dispatch) => {
    try {
      dispatch({type: SAVE_TRANSACTION_REQUEST});
      await writeData(SCHEMAS.TRANSACTION, transaction);

      const dataTotalsByType = await getDataTotals(transaction);
      const transactionConfirmed = transaction;
      transactionConfirmed.type = `${transaction.type}_CONFIRMED`;
      const dataTotalsTypeConfirmed = await getDataTotals(transactionConfirmed);
      console.log(
        'confirmed =>',
        dataTotalsTypeConfirmed,
        'type =>',
        dataTotalsByType,
      );

      if (dataTotalsByType.length) {
        const [totals] = dataTotalsByType;

        const sum = incrementDataTotals(transaction, totals);

        saveTotalValuesBd({
          dispatch,
          value: sum * 100,
          transaction: transaction,
          totals,
        });
      } else {
        saveTotalValuesBd({
          dispatch,
          value: transaction.value,
          transaction: transaction,
        });
      }

      if (transaction.status === TRANSACTION_STATUS.PAID) {
        if (dataTotalsTypeConfirmed.length) {
          const [totals] = dataTotalsTypeConfirmed;

          const sum = incrementDataTotals(dataTotalsTypeConfirmed, totals);

          saveTotalValuesBd({
            dispatch,
            value: sum * 100,
            transaction: transactionConfirmed,
            totals,
          });
        } else {
          saveTotalValuesBd({
            dispatch,
            value: dataTotalsTypeConfirmed.value,
            transaction: transactionConfirmed,
          });
        }
      }

      await updateAccountBalance(dispatch, transaction);

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
      await removeById(SCHEMAS.TRANSACTION, transaction.id);

      const dataTotals = await loadData(
        SCHEMAS.TOTALS,
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

      await updateAccountBalance(dispatch, transaction);

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
      const data = await loadData(
        SCHEMAS.TRANSACTION,
        'accountId = 1 LIMIT(5)',
      );
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
