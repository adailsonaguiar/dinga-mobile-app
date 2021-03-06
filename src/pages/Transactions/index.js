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
  const [totalValue, setTotalValue] = useState(0);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  // useEffect(() => {
  //   getDate().then((date) =>
  //     dispatch(
  //       loadTransactions({month: Number(date.month), year: Number(date.year)}),
  //     ),
  //   );
  //   // sumTotalValue();
  // }, []);

  const sumTotalValue = () => {
    let sumValue = 0;
    transactions.forEach((transaction) => {
      console.log(transaction);
      // sumValue += account.balance;
    });
    setTotalValue(formatMoney(sumValue));
  };

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
          {/* <S.SaldoTotal>Saldo das contas: R$ {totalValue}</S.SaldoTotal> */}
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Transactions;
