import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.backgroundColorPrimary};
`;
export const HerderList = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
  margin-top: 10px;
`;
export const TitleComponent = styled.Text`
  color: ${colors.fontLight};
  font-size: 30px;
  font-family: Roboto-Bold;
`;
export const TxtDate = styled.Text`
  color: #95a5a6;
  font-size: 12px;
  font-family: Roboto-Medium;
`;
export const Lista = styled.View`
  flex: 5;
`;
export const Conta = styled.TouchableOpacity`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #1d1d1d;
  height: 70px;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;
export const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;
export const ColLeft = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  flex: 2;
`;
export const TitleConta = styled.Text`
  color: ${colors.fontLight};
  font-size: 15px;
  font-family: Roboto-Bold;
`;
export const CategoryConta = styled.Text`
  color: #90909c;
  font-family: Roboto-Regular;
  font-size: 11px;
`;
export const ColRight = styled.View`
  flex-direction: column;
  align-items: flex-end;
  flex: 2;
`;
export const Saldo = styled.Text`
  color: ${colors.fontLight};
  font-size: 16px;
  font-family: Roboto-Bold;
`;
export const Atualizado = styled.Text`
  color: #90909c;
  font-family: Roboto-Regular;
  font-size: 11px;
`;
export const Footer = styled.View`
  background: ${colors.backgroundColorSecondary};
  height: 61px;
  align-items: center;
  padding-left: 20px;
  flex-direction: row;
`;
export const SaldoTotal = styled.Text`
  color: ${colors.fontLight};
  flex: 3;
  font-family: Roboto-Medium;
  font-size: 11px;
`;
export const BtnNovaConta = styled.TouchableOpacity`
  background: #282828;
  border-radius: 10px;
  flex: 2;
  height: 47px;
  width: 110px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
export const TxtNovaConta = styled.Text`
  color: ${colors.fontLight};
  font-family: Roboto-Bold;
  font-size: 11px;
`;
