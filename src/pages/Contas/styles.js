import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${colors.backgroundColorPrimary};
`;

export const Lista = styled.View`
  flex: 5;
`;

export const Footer = styled.View`
  background: ${colors.backgroundColorPrimary};
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  flex-direction: row;
`;

export const SaldoTotal = styled.Text`
  color: ${colors.fontLight};
  flex: 3;
  font-family: ${fontMedium};
  font-size: 11px;
`;

export const BtnNovaConta = styled(RectButton)`
  background: ${colors.graphite};
  border-radius: 10px;
  flex: 2;
  height: 47px;
  width: 110px;
  justify-content: center;
  align-items: center;
`;

export const TxtNovaConta = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 11px;
`;
