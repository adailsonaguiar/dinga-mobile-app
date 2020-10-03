import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {StatusBar, FlatList} from 'react-native';
import {
  accounts as accountsUtil,
  getAccountIndentity,
} from '../../utils/accounts';
import {useDispatch, useSelector} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import {getDate, formatMoney} from '../../utils/FunctionUtils';
import moment from 'moment';

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
  BtnNovaConta,
  TxtNovaConta,
  LineLeft,
} from './styles';
import colors from '../../styles/colors';
import Header from '../../components/Header';

const Carteiras = ({navigation}) => {
  // const arrayAccounts = accountsUtil;
  const [totalValue, setTotalValue] = useState(0);
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);
  const accountIndetify = getAccountIndentity();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDate().then((date) => {
        dispatch(loadAccounts(date.month, date.year));
      });
      sumTotalValue();
    });

    return unsubscribe;
  }, []);

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
                <LineLeft
                  lineLeftColor={accountIndetify[item.account]?.color}
                />
                <ColLeft>
                  <TitleConta>
                    {accountIndetify[item.account]?.label}
                  </TitleConta>
                  <CategoryConta>
                    {accountIndetify[item.account]?.accountType}
                  </CategoryConta>
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
