import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import {getAccountIndentity} from '../../utils/accounts';
import {useDispatch, useSelector} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import {formatMoney} from '../../utils/FunctionUtils';

import * as S from './styles';
import colors from '../../styles/colors';
import Header from '../../components/Header';
import CardTransaction from '../../components/CardTransaction';
import {pages} from '../../routes';

const Accounts = ({navigation}) => {
  const [totalValue, setTotalValue] = useState(0);
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);
  const accountIndetify = getAccountIndentity();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(loadAccounts());
    });
    return unsubscribe;
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
      <S.Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.backgroundColorPrimary}
        />
        <S.Lista>
          <FlatList
            data={accounts}
            renderItem={({item}) => (
              <CardTransaction
                navigation={navigation}
                screenNavigate={pages.contaForm}
                parameters={{account: {...accountIndetify[item.account], item}}}
                lineLeftColor={accountIndetify[item.account]?.color}
                transactionTitle={accountIndetify[item.account]?.label}
                categoryTransaction={item.description}
                value={item.balance}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </S.Lista>
        <S.Footer>
          <S.SaldoTotal>
            {totalValue !== 0 ? `Saldo das contas: R$ ${totalValue}` : ''}
          </S.SaldoTotal>
          <S.BtnNovaConta
            onPress={() => {
              navigation.navigate('ContaForm', {});
            }}>
            <S.TxtNovaConta>Adicionar Conta</S.TxtNovaConta>
          </S.BtnNovaConta>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Accounts;
