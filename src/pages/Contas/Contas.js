import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import {getAccountIndentity} from '../../utils/accounts';
import {useDispatch, useSelector} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import {getDate, formatMoney} from '../../utils/FunctionUtils';
import moment from 'moment';

import * as S from './styles';
import colors from '../../styles/colors';
import Header from '../../components/Header';

const Carteiras = ({navigation}) => {
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
      <S.Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.backgroundColorPrimary}
        />
        <S.Lista>
          <FlatList
            data={accounts}
            renderItem={({item}) => (
              <S.Conta
                onPress={() => {
                  navigation.navigate('ContaForm', {
                    account: {...accountIndetify[item.account], item},
                  });
                }}>
                <S.LineLeft
                  lineLeftColor={accountIndetify[item.account]?.color}
                />
                <S.ColLeft>
                  <S.TitleConta>
                    {accountIndetify[item.account]?.label}
                  </S.TitleConta>
                  <S.CategoryConta>
                    {accountIndetify[item.account]?.accountType}
                  </S.CategoryConta>
                </S.ColLeft>
                <S.ColRight>
                  <S.Saldo>R${`${formatMoney(item.balance)}`}</S.Saldo>
                  <S.Atualizado>
                    Atualizado: {`${moment(item.date).format('DD/MM/YYYY')}`}
                  </S.Atualizado>
                </S.ColRight>
              </S.Conta>
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

export default Carteiras;
