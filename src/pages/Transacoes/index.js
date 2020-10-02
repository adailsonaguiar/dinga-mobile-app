import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import accountsUtil from '../../utils/accounts';
import {loadTransactions} from '../../store/transactions/actions';
import {getDate, formatMoney} from '../../utils/FunctionUtils';
import colors from '../../styles/colors';

import {
  Container,
  HerderList,
  TitleComponent,
  TxtDate,
  Conta,
  Icon,
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

const Transacoes = ({navigation}) => {
  const [arrayAccounts] = useState(accountsUtil);
  const [currentDate, setCurrentDate] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.accounts.transactions);

  console.info(transactions);

  useEffect(() => {
    getDate().then((date) => {
      setCurrentDate(`${date.day}/${date.month}/${date.year}`);
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
                  navigation.navigate('ContaForm', {
                    account: item,
                  });
                }}>
                {/* <Icon source={arrayAccounts[item.account].icon} /> */}
                <ColLeft>
                  <TitleConta>{item.description}</TitleConta>
                  <CategoryConta>
                    {arrayAccounts[item.accountId].label}
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
