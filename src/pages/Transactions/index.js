import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {loadTransactions} from '../../store/transactions/actions';
import {formatMoney, getDate} from '../../utils/FunctionUtils';
import colors from '../../styles/colors';

import * as S from './styles';
import Header from '../../components/Header';
import {pages} from '../../routes';
import CardTransaction from '../../components/CardTransaction';
import {
  categoriesExpense,
  categoriesIncome,
} from '../../utils/categoriesTransactions';
import {transactionType} from '../../schemas/TransactionSchema';

const Transactions = ({navigation}) => {
  const transactions = useSelector((state) => state.transactions.list);
  const totalValueOut = useSelector(
    (state) => state.transactions.totalValueTransactionsOut,
  );
  const totalValueIn = useSelector(
    (state) => state.transactions.totalValueTransactionsIn,
  );

  function getTransactionStatus(status) {
    const statusList = {
      0: 'Pendente',
      1: 'Confirmado',
      2: '',
    };
    return statusList[status];
  }

  function getCategories(transaction) {
    if (transaction.type === transactionType.TRANSACTION_IN)
      return categoriesIncome;
    return categoriesExpense;
  }

  return (
    <>
      <Header title="Transações" showMonthHeader />
      <S.Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.backgroundColorPrimary}
        />
        <S.List>
          <FlatList
            data={transactions}
            renderItem={({item}) => (
              <CardTransaction
                navigation={navigation}
                screenNavigate={pages.transactionForm}
                parameters={{
                  transaction: item,
                  date: {day: item.day, month: item.month, year: item.year},
                  formType: item.type === transactionType.TRANSACTION_IN,
                }}
                transactionTitle={item.description}
                categoryTransaction={getCategories(item)[item.category].label}
                value={item.value}
                date={{day: item.day, month: item.month, year: item.year}}
                status={getTransactionStatus(item.status)}
                type={item.type}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </S.List>
        <S.Footer>
          <S.SaldoTotal>
            Saldo das contas: R$ {formatMoney(totalValueOut)} {formatMoney(totalValueIn)}
          </S.SaldoTotal>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Transactions;
