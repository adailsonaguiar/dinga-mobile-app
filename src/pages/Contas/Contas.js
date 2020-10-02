import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import {accounts as accountsUtil} from '../../utils/accounts';
import {useDispatch, useSelector} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import {getDate, formatMoney} from '../../utils/FunctionUtils';
import moment from 'moment';

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
import Header from '../../components/Header';

const Carteiras = ({navigation}) => {
  // const arrayAccounts = accountsUtil;
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

  useEffect(() => {
    sumTotalValue();
  }, [accounts]);

  const sumTotalValue = () => {
    let sumValue = 0;
    accounts.forEach((account) => {
      sumValue += account.balance;
    });
    setTotalValue(formatMoney(sumValue));
  };

  return (
    <>
      <Header title="Suas contas" />
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.backgroundColorPrimary}
        />
        <Lista>
          <FlatList
            data={accounts}
            renderItem={({item}) => (
              <Conta
                onPress={() => {
                  navigation.navigate('ContaForm', {
                    account: {
                      id: item.id,
                      balance: item.balance,
                      label: item.label,
                      date: item.date,
                      description: item.description,
                      account: item.account,
                    },
                  });
                }}>
                {/* <Icon source={arrayAccounts[item.account].icon} /> */}
                <ColLeft>
                  <TitleConta>tedste</TitleConta>
                  <CategoryConta>teste</CategoryConta>
                </ColLeft>
                <ColRight>
                  <Saldo>R${`${formatMoney(item.balance)}`}</Saldo>
                  <Atualizado>
                    Atualizado: {`${moment(item.date).format('DD/MM/YYYY')}`}
                  </Atualizado>
                </ColRight>
              </Conta>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Lista>
        <Footer>
          <SaldoTotal>
            {totalValue !== 0 ? `Saldo das contas: R$ ${totalValue}` : ''}
          </SaldoTotal>
          <BtnNovaConta
            onPress={() => {
              navigation.navigate('ContaForm', {});
            }}>
            <TxtNovaConta>Adicionar Conta</TxtNovaConta>
          </BtnNovaConta>
        </Footer>
      </Container>
    </>
  );
};

export default Carteiras;
