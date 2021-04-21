import {RectButton} from 'react-native-gesture-handler';
import styled, {css} from 'styled-components';
import colors from '../../styles/colors';
import {fontMedium, fontRegular} from '../../styles/fonts';

import {transactionType} from '../../schemas/TransactionSchema';

export const Conta = styled(RectButton)`
  flex-direction: row;
  height: 70px;
  align-items: center;
`;

export const ColLeft = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const TitleConta = styled.Text`
  color: ${colors.fontLight};
  font-size: 15px;
  font-family: ${fontMedium};
`;

export const CategoryConta = styled.Text`
  color: #90909c;
  font-family: ${fontRegular};
  font-size: 11px;
`;

export const ColRight = styled.View`
  flex-direction: column;
  align-items: flex-end;
  flex: 2;
`;

export const Saldo = styled.Text`
  ${({type}) => css`
    color: ${type === transactionType.TRANSACTION_IN
      ? colors.greenApp
      : colors.colorDanger};
    font-size: 16px;
    font-family: ${fontMedium};
  `}
`;

export const Atualizado = styled.Text`
  color: #90909c;
  font-family: ${fontRegular};
  font-size: 11px;
`;

export const LineLeft = styled.View`
  ${({lineLeftColor}) => css`
    width: 5px;
    height: 37px;
    background-color: ${lineLeftColor ? lineLeftColor : '#90909C'};
    margin-right: 10px;
  `}
`;
