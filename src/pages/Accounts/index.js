import React from 'react';
import {StatusBar, FlatList} from 'react-native';
import {getAccountIndentity} from '../../utils/accounts';
import {useSelector} from 'react-redux';
import {formatMoney} from '../../utils/FunctionUtils';

import * as S from './styles';
import colors from '../../styles/colors';
import Header from '../../components/Header';
import CardTransaction from '../../components/CardTransaction';
import {pages} from '../../routes';

const Accounts = ({navigation}) => {
  const accounts = useSelector((state) => state.accounts.accounts);
  const totalValueOut = useSelector(
    (state) => state.transactions.totalValueTransactionsOut,
  );
  const totalValueIn = useSelector(
    (state) => state.transactions.totalValueTransactionsIn,
  );

  const accountIndetify = getAccountIndentity();

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
                screenNavigate={pages.accountForm}
                parameters={{account: {...accountIndetify[item.account], item}}}
                lineLeftColor={accountIndetify[item.account]?.color}
                transactionTitle={accountIndetify[item.account]?.label}
                categoryTransaction={item.description}
                value={item.balance}
                date={{day: item.day, month: item.month, year: item.year}}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </S.Lista>
        <S.Footer>
          <S.SaldoTotal>
            Total das contas: R$ ${formatMoney(totalValueIn - totalValueOut)}
          </S.SaldoTotal>
          <S.BtnNovaConta
            onPress={() => {
              navigation.navigate(pages.accountForm, {});
            }}>
            <S.TxtNovaConta>Adicionar Conta</S.TxtNovaConta>
          </S.BtnNovaConta>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Accounts;
