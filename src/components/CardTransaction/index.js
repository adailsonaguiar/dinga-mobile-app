import React from 'react';

import {formatMoney, formatteNumber} from '../../utils/FunctionUtils';
import * as S from './styles';

const CardTransaction = ({
  navigation,
  screenNavigate,
  parameters,
  lineLeftColor,
  transactionTitle,
  categoryTransaction,
  value,
  status = '',
  date,
  type = 'TRANSACTION_IN',
}) => {
  return (
    <S.Conta
      onPress={() =>
        navigation && navigation.navigate(screenNavigate, parameters)
      }>
      {lineLeftColor && <S.LineLeft lineLeftColor={lineLeftColor} />}
      <S.ColLeft>
        <S.TitleConta>{transactionTitle}</S.TitleConta>
        <S.CategoryConta>{categoryTransaction}</S.CategoryConta>
      </S.ColLeft>
      <S.ColRight>
        <S.Saldo type={type}>R${`${formatMoney(value)}`}</S.Saldo>
        <S.Atualizado>{`${status} ${formatteNumber(date.day)}/${formatteNumber(
          date.month,
        )}`}</S.Atualizado>
      </S.ColRight>
    </S.Conta>
  );
};

export default CardTransaction;
