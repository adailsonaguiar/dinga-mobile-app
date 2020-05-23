import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import Header from '../../components/Header/Header';
import accountsUtil from '../../utils/accounts';
import {useDispatch, useSelector} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import {getDate, formatMoney} from '../../utils/FunctionUtils';

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
  BtnNovaConta,
  TxtNovaConta,
} from './styles';
import colors from '../../styles/colors';

const Carteiras = ({navigation}) => {
  const [arrayAccounts] = useState(accountsUtil);
  const [currentDate, setCurrentDate] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);

  useEffect(() => {
    getDate().then((date) => {
      setCurrentDate(`${date.day}/${date.month}/${date.year}`);
      dispatch(loadAccounts(date.month, date.year));
    });
    sumTotalValue();
  }, []);

  const sumTotalValue = () => {
    let sumValue = 0;
    accounts.forEach((account) => {
      sumValue += account.balance;
    });
    setTotalValue(formatMoney(sumValue));
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.colorStandardPrimary} />
      <Header title="Finax" />
      <HerderList>
        <TitleComponent>SUAS CONTAS</TitleComponent>
        <TxtDate>{currentDate}</TxtDate>
      </HerderList>
      <Lista>
        <FlatList
          data={accounts}
          renderItem={({item}) => (
            <Conta
              onPress={() => {
                navigation.navigate('ContaForm', {
                  account: item,
                });
              }}>
              <Icon source={arrayAccounts[item.account].icon} />
              <ColLeft>
                <TitleConta>{arrayAccounts[item.account].label}</TitleConta>
                <CategoryConta>{item.description}</CategoryConta>
              </ColLeft>
              <ColRight>
                <Saldo>R${`${formatMoney(item.balance)}`}</Saldo>
                <Atualizado>
                  Atualizado: {`${item.day}/${item.month}/${item.year}`}
                </Atualizado>
              </ColRight>
            </Conta>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Lista>
      <Footer>
        <SaldoTotal>Saldo das contas: R$ {totalValue}</SaldoTotal>
        <BtnNovaConta
          onPress={() => {
            navigation.navigate('ContaForm', {});
          }}>
          <TxtNovaConta>Adicionar Conta</TxtNovaConta>
        </BtnNovaConta>
      </Footer>
    </Container>
  );
};

export default Carteiras;
