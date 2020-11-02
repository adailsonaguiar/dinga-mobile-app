import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {getAccountIndentity} from '../../utils/accounts';
import {loadTransactions} from '../../store/transactions/actions';
import {getDate, formatMoney} from '../../utils/FunctionUtils';
import colors from '../../styles/colors';

import * as S from './styles';
import Header from '../../components/Header';
import {pages} from '../../routes';
import CardTransaction from '../../components/CardTransaction';
import categories from '../../utils/categoriesTransactions';

const Transacoes = ({navigation}) => {
  const [totalValue, setTotalValue] = useState(0);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);
  const accountIndetify = getAccountIndentity();

  useEffect(() => {
    getDate().then((date) => {
      dispatch(loadTransactions(date.month, date.year));
    });
    sumTotalValue();
  }, []);

  const sumTotalValue = () => {
    let sumValue = 0;
    transactions.forEach((account) => {
      sumValue += account.balance;
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

  return (
    <>
      <Header title="Transações" showMonthHeader />
      <S.Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.backgroundColorPrimary}
        />
        <S.Lista>
          <FlatList
            data={transactions}
            renderItem={({item}) => (
              <CardTransaction
                navigation={navigation}
                screenNavigate={pages.despesaForm}
                parameters={{transaction: item}}
                transactionTitle={item.description}
                categoryTransaction={categories[item.category].label}
                value={item.value}
                date={item.date}
                status={getTransactionStatus(item.status)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </S.Lista>
        <S.Footer>
          <S.SaldoTotal>Saldo das contas: R$ {totalValue}</S.SaldoTotal>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Transacoes;
