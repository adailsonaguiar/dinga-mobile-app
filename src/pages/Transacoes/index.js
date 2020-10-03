import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {getAccountIndentity} from '../../utils/accounts';
import {loadTransactions} from '../../store/transactions/actions';
import {getDate, formatMoney} from '../../utils/FunctionUtils';
import colors from '../../styles/colors';

import {
  Container,
  Conta,
  TitleConta,
  CategoryConta,
  ColLeft,
  ColRight,
  Saldo,
  Atualizado,
  Lista,
  Footer,
  SaldoTotal,
} from './styles';
import Header from '../../components/Header';
import {pages} from '../../routes';

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
      0: 'PENDENTE',
      1: 'CONFIRMADO',
      2: '',
    };
    return statusList[status];
  }

  return (
    <>
      <Header title="Transações" showMonthHeader />
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.backgroundColorPrimary}
        />
        <Lista>
          <FlatList
            data={transactions}
            renderItem={({item}) => (
              <Conta
                onPress={() => {
                  navigation.navigate(pages.despesaForm, {});
                }}>
                <ColLeft>
                  <TitleConta>{item.description}</TitleConta>
                  <CategoryConta>
                    {accountIndetify[item.accountId]?.label}
                  </CategoryConta>
                </ColLeft>
                <ColRight>
                  <Saldo>R${`${formatMoney(item.value)}`}</Saldo>
                  <Atualizado>
                    {moment(item.date).format('DD/MM')}{' '}
                    {getTransactionStatus(item.status)}
                  </Atualizado>
                </ColRight>
              </Conta>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Lista>
        <Footer>
          <SaldoTotal>Saldo das contas: R$ {totalValue}</SaldoTotal>
        </Footer>
      </Container>
    </>
  );
};

export default Transacoes;
